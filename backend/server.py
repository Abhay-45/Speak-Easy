from flask import Flask, request
import json
import base64
import os
import io
from gingerit.gingerit import GingerIt
import string
from pydub import AudioSegment
from pydub.silence import split_on_silence
from google.cloud import texttospeech_v1

relative_path = "Credentials/googleCloudCredentials.json"

from google.cloud import speech

app = Flask(__name__)
speechclient = speech.SpeechClient.from_service_account_json(relative_path)
textclient = texttospeech_v1.TextToSpeechClient.from_service_account_json(relative_path)

from flask_cors import CORS
CORS(app)

def transcribe_audio(file, language):
    with io.open(file, "rb") as audio_file:
        content = audio_file.read()

    audio = speech.RecognitionAudio(content=content)
    
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=16000,
        language_code=language,
    )

    response = speechclient.recognize(config=config, audio=audio)

    return response

def getVoiceFromGender(language, gender):
    if language == "en-US":
        if gender == "Female":
            return "C"
        else:
            return "A"
    else:
        if gender == "Female":
            return "A"
        else:
            return "B"

        

def getAudioFromText(text, language, gender):

    synthesisInput = texttospeech_v1.SynthesisInput(text = text)

    voice = texttospeech_v1.VoiceSelectionParams(
        language_code = language,
        name = "en-IN-Standard-"+ getVoiceFromGender(language,gender)
    )

    audio_config = texttospeech_v1.AudioConfig(
        audio_encoding = texttospeech_v1.AudioEncoding.MP3
    )

    response = textclient.synthesize_speech(
        input = synthesisInput,
        voice = voice,
        audio_config=audio_config
    )

    with open("output.mp3","wb") as out:
        out.write(response.audio_content)

def getPace(data,words):
    lastResult = data[len(data) - 1]
    totalTime = lastResult.result_end_time.seconds
    if totalTime != 0:
        return len(words)/totalTime
    else:
        return 0
    

def getConfidence(data):
    numberOfResults = len(data)
    totalConfidence = 0
    for result in data:
        confidence = result.alternatives[0].confidence
        totalConfidence = totalConfidence + confidence
    if numberOfResults != 0:
        averageConfidence = round(((totalConfidence/numberOfResults) * 100))
        return averageConfidence
    else:
        return 0

def getText(data):
    words = []
    for result in data:
        sentence = result.alternatives[0].transcript
        words.extend(sentence.split())
    if len(words) > 0:
        words[0] = words[0].capitalize()
    text = " ".join(words)
    return text, words

def getCorrectText(text):
    parser = GingerIt()
    result = parser.parse(text)
    corrected_sentence = result['result']
    errors = len(result['corrections'])
    return corrected_sentence, errors

def removePunctionation(corrected_sentence, errors):
    words = []
    realErrors = errors
    for letter in corrected_sentence:
        if letter in string.punctuation:
            realErrors = realErrors - 1
        else:
            words.append(letter)
    if realErrors < 0:
        realErrors = 0

    corrected_sentence = "".join(words)
    return corrected_sentence, realErrors

def getFillers():
    final_audio = AudioSegment.from_wav("audio.wav")
    dBFS = final_audio.dBFS
    chunks = split_on_silence(final_audio,min_silence_len=500,silence_thresh=dBFS-16)
    return len(chunks) - 1 
                
            
            
def audioProcess(data, inputLanguage, outputLanguage, gender):
    file = open("audio.mp3", "wb")
    byte_string = bytes(data, 'utf-8')
    file.write(base64.b64decode(data))
    print(file)
    os.system("ffmpeg -i audio.mp3 audio.wav")
    os.system("ffmpeg -y  -i audio.wav  -acodec pcm_s16le -f s16le -ac 1 -ar 16000 audio.raw")
    transcribed_audio = transcribe_audio("audio.raw", inputLanguage)
    text, words = getText(transcribed_audio.results)
    confidence = getConfidence(transcribed_audio.results)
    pace = getPace(transcribed_audio.results, words)
    corrected_sentence, errors = getCorrectText(text)
    corrected_sentence, errors = removePunctionation(corrected_sentence,errors)
    fillers = getFillers()
    getAudioFromText(corrected_sentence, outputLanguage, gender)
    print("Transcribed Auto", transcribed_audio)
    print("Original Text:   ", text)
    print("Confidence:   ", confidence)
    print("Pace   ", pace)
    print("Corrected Sentence:   ", corrected_sentence)
    print("Errors:   ", errors)
    print("Long Pauses: ", fillers)

    output_audio_url = str(base64.b64encode(open("output.mp3", "rb").read()))
    output_audio_url = output_audio_url[2: len(output_audio_url) -1]
    print("AudioUrl:  ",output_audio_url)

    ##Removing all temp files at the end
    os.remove("audio.wav")
    os.remove("audio.raw")

    return {"status": "Success", 
            "original_text": text, 
            "corrected_text": corrected_sentence, 
            "confidence": confidence,
            "pace": pace,
            "errors": errors,
            "fillers": fillers,
            "output_audio": output_audio_url
            }


@app.route('/audioProcessing', methods = ['GET', 'POST'])
def audio_endpoint(): 
    data = request.json
    result = audioProcess(data['audio'], data['inputLanguage'],data['outputLanguage'],data['gender'])
    return result

if __name__ == '__main__':
    app.run()