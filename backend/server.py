from flask import Flask, request
import json
import base64
import os
import io

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

def audioProcess(data):
    file = open("audio.mp3", "wb")
    byte_string = bytes(data, 'utf-8')
    file.write(base64.b64decode(data))
    print(file)
    os.system("ffmpeg -i audio.mp3 audio.wav")
    os.system("ffmpeg -y  -i audio.wav  -acodec pcm_s16le -f s16le -ac 1 -ar 16000 audio.raw")
    transcribed_audio = transcribe_audio("audio.raw")
    print("Transcribed Audio:   ", transcribed_audio.results[0].alternatives[0].transcript)


@app.route('/audioProcessing', methods = ['GET', 'POST'])
def audio_endpoint(): 
    data = request.json
    audioProcess(data['audio'])
    return data


if __name__ == '__main__':
    app.run()