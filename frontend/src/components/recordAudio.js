import React,{useState} from 'react';
import MicRecorder from 'mic-recorder-to-mp3'
import {Button} from 'reactstrap'

const recorder = new MicRecorder({
    bitRate: 128
});

const RecordAudio = () => {
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
                const base64String = reader.result.toString();
                console.log(base64String)
            }

            const newRecordings = [...recordings, file];
            setRecordings(newRecordings);
            setIsRecording(false);
        }).catch((e) => {
            console.error(e);
        });
    };

    return (
        <div>
            <h1>Mic Recorder to Mp3 Example</h1>
            <p>Check your web developer tool console.</p>
            <hr />

            {isRecording ? (
                <Button className="btn btn-danger" onClick={stopRecording}>
                    Stop recording
                </Button>
            ) : (
                <Button className="btn btn-primary" onClick={startRecording}>
                    Start recording
                </Button>
            )}

            <br />
            <br />
            <br />

            <ul id="playlist">
                {recordings.map((file, index) => (
                    <li key={index}>
                        <audio controls>
                            <source src={URL.createObjectURL(file)} type={file.type} />
                        </audio>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default RecordAudio