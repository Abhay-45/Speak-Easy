from flask import Flask, request
import json
import base64
import os
import io
from gingerit.gingerit import GingerIt
import string

relative_path = "Credentials/googleCloudCredentials.json"

from google.cloud import speech

app = Flask(__name__)
client = speech.SpeechClient.from_service_account_json(relative_path)

from flask_cors import CORS
CORS(app)

def transcribe_audio(file):
    with io.open(file, "rb") as audio_file:
        content = audio_file.read()

    audio = speech.RecognitionAudio(content=content)
    
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=16000,
        language_code="en-US",
    )

    response = client.recognize(config=config, audio=audio)

    return response

def getPace(data,words):
    lastResult = data[len(data) - 1]
    totalTime = lastResult.result_end_time.seconds
    return len(words)/totalTime
    

def getConfidence(data):
    numberOfResults = len(data)
    totalConfidence = 0
    for result in data:
        confidence = result.alternatives[0].confidence
        totalConfidence = totalConfidence + confidence
    averageConfidence = round(((totalConfidence/numberOfResults) * 100))
    return averageConfidence

def getText(data):
    words = []
    for result in data:
        sentence = result.alternatives[0].transcript
        words.extend(sentence.split())
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

    




        
def audioProcess(data):
    file = open("audio.mp3", "wb")
    byte_string = bytes(data, 'utf-8')
    file.write(base64.b64decode(data))
    print(file)
    os.system("ffmpeg -i audio.mp3 audio.wav")
    os.system("ffmpeg -y  -i audio.wav  -acodec pcm_s16le -f s16le -ac 1 -ar 16000 audio.raw")
    transcribed_audio = transcribe_audio("audio.raw")
    text, words = getText(transcribed_audio.results)
    confidence = getConfidence(transcribed_audio.results)
    pace = getPace(transcribed_audio.results, words)
    corrected_sentence, errors = getCorrectText(text)
    corrected_sentence, errors = removePunctionation(corrected_sentence,errors)
    fillers = len(transcribed_audio.results) - 1
    print("Transcribed Auto", transcribed_audio)
    print("Original Text:   ", text)
    print("Confidence:   ", confidence)
    print("Pace   ", pace)
    print("Corrected Sentence:   ", corrected_sentence)
    print("Errors:   ", errors)



@app.route('/audioProcessing', methods = ['GET', 'POST'])
def audio_endpoint(): 
    data = request.json
    audioProcess(data['audio'])
    return data


if __name__ == '__main__':
    app.run()