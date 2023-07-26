import React, { useState, useEffect } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { Button, Container, ButtonGroup } from "reactstrap";
import COLORS from '../constants/theme';

function UploadAudioPage({ outPutAudioUrl, setOutPutAudioUrl }) {
    const [file, setFile] = React.useState(null)
    const fileInput = React.useRef();
    const [audioPreviewUrl, setAudioPreviewUrl] = React.useState(null);
    // const [outPutUrl, setOutPutUrl] = React.useState(null)
    const [pace, setpace] = React.useState("")
    const [confidence, setConfidence] = useState()

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
                outPutFormating(Result)

            });

    }

    const outPutFormating = (Result) => {
        console.log(Result)
        setOutPutAudioUrl("data:audio/mpeg;base64," + Result.output_audio)
        setpace(Result['pace'])

    }

    return (
        <div className='fileinput text-center' style={{ padding: 50 }}>
            <div style={{ display: "flex", flexDirection: 'column', justifyContent : 'center', alignItems : 'center' }}>
                <h1 style={{ paddingBottom: 20 }}>Upload</h1>
                <ButtonGroup style={{paddingBottom : 10, borderRadius: 10}}>
                    <Button color='success' style={{width: 90}}>
                        Upload
                    </Button>
                    <Button color="primary" style={{width: 90}} >
                        Speak
                    </Button>
                </ButtonGroup>
                <input type="file" onChange={handleFileChange} ref={fileInput} style={{ display: 'none' }} />
                <ReactAudioPlayer src={audioPreviewUrl} autoPlay={false} controls style={{ margin: 20 }} />
            </div>
            <Container>
                {file === null ? (
                    <Button className="btn-round" color="secondary" onClick={handleClick} style={{marginTop: 10}}>
                        {"Select file"}
                    </Button>
                ) : (
                    <div style={{ padding: 20 }}>
                        <Button className="btn-round" color="secondary" onClick={handleClick} style={{ marginRight: "40px" }}>
                            Change
                        </Button>
                        <Button color="danger" className="btn-round" onClick={handleRemove}>
                            <i className="fa fa-times" /> Remove
                        </Button>
                    </div>
                )}
            </Container>
            <Container>
                {file !== null && (
                    <Button className="btn-round" onClick={handleProcess} style={{ margin: "30px", backgroundColor: COLORS.TURQUOISE }}>
                        Process
                    </Button>
                )}
            </Container>


        </div>
    )
}

export default UploadAudioPage;

