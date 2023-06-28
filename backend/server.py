from flask import Flask, request
app = Flask(__name__)

from flask_cors import CORS
CORS(app)

@app.route('/audioProcessing', methods = ['GET', 'POST'])
def audio_endpoint(): 
    data = request.json
    print(data)
    return data


if __name__ == '__main__':
    app.run()