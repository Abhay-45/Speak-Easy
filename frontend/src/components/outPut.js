import React, { useEffect, useState } from 'react'
import output from '../constants/output'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, Col, Container } from 'reactstrap';
import COLORS from '../constants/theme';
import ReactAudioPlayer from 'react-audio-player';
import LoadingGif from '../constants/loading.gif'

const OutPut = ({ outPutAudioUrl, isProcessing, setSettingsOpen }) => {
    const [modal, setModal] = useState(false);
    const [genderOption, setGenderOption] = useState("NEUTRAL");
    const [accentOption, setAccentOption] = useState("en-US")

    // Event handler for radio button selection
    const handleRadioChange = (event) => {
        setGenderOption(event.target.value);
    };

    const handleAccentChange = (event) => {
        setAccentOption(event.target.value)
    }

    // Event handler for Save button click
    const handleSaveClick = () => {
        console.log('Selected Gender:', genderOption);
        console.log('Selected Accent:', accentOption);
        setModal(!modal)
    };

    const toggle = () => setModal(!modal);


    return (
        <div id="outputSection" className="outPutRefClass" style={{ backgroundColor: COLORS.GRAY1, padding: 50 }}>
            <h1 className='' style={{ paddingBottom: 20 }}>Output</h1>

            <Button  size='lg'  onClick={() => setSettingsOpen(true)} style={{paddingLeft: 30,
                                paddingRight: 30, backgroundColor: COLORS.PRIMARY, border: 0 }}>
                Output Audio Settings
            </Button>

            <Container>
                {isProcessing && (
                    <img src={LoadingGif} style = {{width:"7%"}}/>
                )}
                {outPutAudioUrl != null && (
                    <div className="mt-5" style={{ border: "20px", borderColor: COLORS.PRIMARY }}>
                        <ReactAudioPlayer style={{ border: 5, borderColor: COLORS.PRIMARY, width: "30rem" }} src={outPutAudioUrl} autoPlay={false} controls />
                    </div>

                )}
            </Container>
        </div>
    )
}

export default OutPut