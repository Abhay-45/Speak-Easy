import React, { useState } from 'react';
import MicRecorder from 'mic-recorder-to-mp3'
import { Button } from 'reactstrap'
import recordingGif from '../constants/recording.gif'


const recorder = new MicRecorder({
    bitRate: 128
});

const RecordAudio = ({ setAudioPreviewUrl, setFile }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [recordings, setRecordings] = useState([]);

    const startRecording = () => {
        recorder.start().then(() => {
            setIsRecording(true);
        }).catch((e) => {
            console.error(e);
        });
    };

    const stopRecording = () => {
        recorder.stop().getMp3().then(([buffer, blob]) => {
            const file = new File(buffer, 'music.mp3', {
                type: blob.type,
                lastModified: Date.now()
            });
            const reader = new FileReader()
            reader.readAsDataURL(blob)
            reader.onload = () => {
                const base64String = reader.result.substr(22);
                setAudioPreviewUrl(reader.result)
                setFile("Live Recording File")
                window.sessionStorage.setItem("input_audio", base64String);
                console.log(base64String)
            }
            setIsRecording(false);
        }).catch((e) => {
            console.error(e);
        });
    };

    return (
        <div>
            {isRecording ? (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                    <img src={recordingGif} style={{ width: "7%" }} />
                    <Button className="btn btn-danger" size='lg' onClick={stopRecording}>
                        Stop recording
                    </Button>
                </div>
            ) : (
                <Button className="btn btn-primary" size='lg' onClick={startRecording} style={{ marginTop: 5 }}>
                    Start recording
                </Button>
            )}
        </div>
    )
}

export default RecordAudio