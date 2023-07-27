import React, { useState, useEffect } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { Button, Container, ButtonGroup } from "reactstrap";
import COLORS from '../constants/theme';
import RecordAudio from './recordAudio';
import RadioOptions from './radioOptions';


function UploadAudioPage({ outPutAudioUrl, setOutPutAudioUrl, audioPreviewUrl, setAudioPreviewUrl, file, setFile, setIsProcessing }) {

    const transcribeLanguages = {
        "English (Australia)": "en-AU",
        "English (Canada)": "en-CA",
        "English (Ghana)": "en-GH",
        "English (Hong Kong)": "en-HK",
        "English (India)": "en-IN",
        "English (Ireland)": "en-IE",
        "English (Kenya)":"en-KE",
        "English (New Zealand)": "en-NZ",
        "English (Nigeria)": "en-NG",
        "English (Pakistan)": "en-PK",
        "English (Philippines)": "en-PH",
        "English (Singapore)": "en-SG",
        "English (South Africa)": "en-ZA",
        "English (Tanzania)": "en-TZ",
        "English (United Kingdom)": "en-GB",
        "English (United States": "en-US"
    }

    const outputLanguages = {
        "English (Australia)": "en-AU",
        "English (India)": "en-IN",
        "English (United Kingdom)": "en-GB",
        "English (United States": "en-US"
    }

    //const [file, setFile] = React.useState(null)
    const fileInput = React.useRef();
    // const [audioPreviewUrl, setAudioPreviewUrl] = React.useState(null);
    // const [outPutUrl, setOutPutUrl] = React.useState(null)
    const [pace, setpace] = React.useState("")
    const [confidence, setConfidence] = useState()
    const [section, setSection] = useState("upload")
    const [selectedOption, setSelectedOption] = useState('upload');

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
        setIsProcessing(true);
        fetch('http://127.0.0.1:5000/audioProcessing', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                audio: window.sessionStorage.getItem("input_audio"),
                inputLanguage: "en-GB",
                outputLanguage: "en-IN",
                gender: "Male"
            })
        })
            .then((Response) => Response.json())
            .then((Result) => {
                // Handle the response from the server
                outPutFormating(Result)
                setIsProcessing(false)

            });
    }

    const outPutFormating = (Result) => {
        console.log(Result)
        setOutPutAudioUrl("data:audio/mpeg;base64," + Result.output_audio)
        setpace(Result['pace'])

    }

    return (
        <div className='fileinput text-center' style={{ padding: 50 }}>
            <div style={{ display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <h1 style={{ paddingBottom: 20 }}>Upload</h1>
                <RadioOptions
                    setSelectedOption={setSelectedOption}
                    selectedOption={selectedOption}
                />
            </div>

            <ReactAudioPlayer src={audioPreviewUrl} autoPlay={false} controls style={{ margin: 20, width: "30rem" }} />

            {selectedOption === "upload" ? (
                <div>
                    <input type="file" onChange={handleFileChange} ref={fileInput} style={{ display: 'none' }} />
                    <Container>
                        {file === null ? (
                            <Button className="btn-round" size='lg' color="secondary" onClick={handleClick} style={{ marginTop: 10 }}>
                                {"Select file"}
                            </Button>
                        ) : (
                            <div style={{ padding: 20 }}>
                                <Button className="btn-round" size='lg' color="secondary" onClick={handleClick} style={{ marginRight: "40px",  paddingLeft: 30,
                            paddingRight: 30 }}>
                                    Change
                                </Button>
                                <Button color="danger" size='lg' className="btn-round" onClick={handleRemove} style={{ paddingLeft: 30,
                            paddingRight: 30}}>
                                    <i className="fa fa-times" /> Remove
                                </Button>
                            </div>
                        )}
                    </Container>
                </div>
            ) :
                (
                    <div>
                        <Container>
                            <RecordAudio
                                setOutPutAudioUrl={setOutPutAudioUrl}
                                setAudioPreviewUrl={setAudioPreviewUrl}
                                setFile={setFile} />
                        </Container>
                    </div>
                )

            }

            <Container>
                {file !== null && (
                    <Button className="btn-round" size='lg' onClick={handleProcess} 
                        style={{ margin: "30px", 
                            backgroundColor: COLORS.TURQUOISE,
                            paddingLeft: 30,
                            paddingRight: 30 }}>
                        Process
                    </Button>
                )}
            </Container>





        </div>
    )
}

export default UploadAudioPage;

