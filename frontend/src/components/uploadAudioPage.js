import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { Button, Container } from "reactstrap";

function UploadAudioPage() {
    const [file, setFile] = React.useState(null)
    const fileInput = React.useRef();
    const [audioPreviewUrl, setAudioPreviewUrl] = React.useState(null);

    const handleFileChange = (e) => {
        e.preventDefault();
        let fileReader = new FileReader();
        let inputFile = e.target.files[0];

        if (inputFile) {
            setFile(inputFile);
            fileReader.readAsDataURL(inputFile);
        }

        fileReader.onloadend = () => {
            setAudioPreviewUrl(fileReader.result);
            console.log(fileReader.result)
            window.sessionStorage.setItem("input_audio", fileReader.result.substr(23));
        };
    }

    const handleClick = () => {
        fileInput.current.click();
    };

    const handleRemove = () => {
        setFile(null);
        setAudioPreviewUrl(null);
        fileInput.current.value = null;
        window.location.reload(false);
    };

    const handleProcess = () => {
        fetch('http://127.0.0.1:5000/audioProcessing', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                audio: window.sessionStorage.getItem("input_audio")
            })
        })
            .then((Response) => Response.json())
            .then((Result) => {
                // Handle the response from the server
                console.log(Result)
            });

    }

    return (
        <div className='fileinput text-center'>
            <h1>Upload Audio</h1>
            <input type="file" onChange={handleFileChange} ref={fileInput} style={{ display: 'none' }} />
            <ReactAudioPlayer src={audioPreviewUrl} autoPlay={false} controls />

            <Container>
                {file === null ? (
                    <Button className="btn-round" color="secondary" onClick={handleClick}>
                        {"Select file"}
                    </Button>
                ) : (
                    <span>
                        <Button className="btn-round" color="secondary" onClick={handleClick} style={{ marginRight: "20px" }}>
                            Change
                        </Button>
                        <Button color="danger" className="btn-round" onClick={handleRemove}>
                            <i className="fa fa-times" /> Remove
                        </Button>
                    </span>
                )}
            </Container>
            <Container>
                {file !== null && (
                    <Button className="btn-round" color="primary" onClick={handleProcess} style={{ marginTop: "50px" }}>
                        Process
                    </Button>
                )}
            </Container>

        </div>
    )
}

export default UploadAudioPage;

