import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { Button } from "reactstrap";

function UploadAudioPage() {
    const [file, setFile] = React.useState(null)
    const fileInput = React.useRef();
    const [audioPreviewUrl, setAudioPreviewUrl] = React.useState(null);

    const handleFileChange = (e) => {
        e.preventDefault();
        let fileReader = new FileReader();
        let inputFile = e.target.files[0];

        fileReader.onloadend = (e) => {
            window.sessionStorage.setItem("input_audio", e.target.result.substr());
            console.log(e.target.result)
            setFile(inputFile);
            setAudioPreviewUrl(fileReader.result);

        };
        if (inputFile) {
            fileReader.readAsDataURL(inputFile);
        }
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

    return (
        <div className='fileinput text-center'>
            <h1>Upload Audio</h1>
            <input type="file" onChange={handleFileChange} ref={fileInput} style={{ display: 'none' }}/>
            <ReactAudioPlayer src={audioPreviewUrl} autoPlay={false} controls />
           
            <div>
                {file === null ? (
                    <Button className="btn-round" color="secondary" onClick={handleClick}>
                        {"Select file"}
                    </Button>
                ) : (
                    <span>
                        <Button className="btn-round" color="default" onClick={handleClick}>
                            Change
                        </Button>
                        {/* {props.avatar ? <br /> : null} */}
                        <Button color="danger" className="btn-round" onClick={handleRemove}>
                            <i className="fa fa-times" /> Remove
                        </Button>
                    </span>
                )}
            </div>
        </div>
    )
}

export default UploadAudioPage;

