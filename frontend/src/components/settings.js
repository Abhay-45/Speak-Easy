import React, { useState } from 'react'
import { Offcanvas, OffcanvasHeader, OffcanvasBody, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, Col, Container } from 'reactstrap'
import { transcribeLanguages, outputLanguages } from '../constants/languges'

const Settings = ({ settingsOpen, setSettingsOpen, setSettings, settings }) => {

    // Event handler for radio button selection
    const handleRadioChange = (event) => {
        setSettings((prevSettings) => ({
            ...prevSettings,
            gender: event.target.value,
        }));
    };

    const handleOutputAccentChange = (event) => {
        setSettings((prevSettings) => ({
            ...prevSettings,
            outputAccent: event.target.value,
        }));
    }

    const handleInputAccentChange = (event) => {
        setSettings((prevSettings) => ({
            ...prevSettings,
            inputAccent: event.target.value,
        }));
    }

    // Event handler for Save button click
    const handleSaveClick = () => {
        setSettingsOpen(false)
        
    };

    function getKeyByValue(object, value) {
        for (const key in object) {
            if (object[key] == value) {
                return key;
            }
        }
        return null; // Value not found
    }

    return (
        <div>
            <Offcanvas isOpen={settingsOpen} direction='end'>
                <OffcanvasHeader toggle={() => { setSettingsOpen(false) }}  >
                    <p style={{ paddingBottom: 0, marginBottom: 0, fontSize: 30 }}>Audio Settings</p>
                </OffcanvasHeader>
                <OffcanvasBody>
                    <hr style={{ marginTop: 0, paddingTop: 0 }} />
                    <div style={{ marginBottom: "2rem" }}>
                        <h5 >Upload Audio Settings</h5>
                        <Form style={{ marginTop: "1rem" }}>
                            <FormGroup>
                                <Label for="inputAccent">
                                    Accent
                                </Label>
                                <Input
                                    id="inputAccent"
                                    name="select"
                                    type="select"
                                    onChange={handleInputAccentChange}
                                >
                                    <option value={settings.inputAccent}>{getKeyByValue(transcribeLanguages, settings.inputAccent)}</option>
                                    {Object.entries(transcribeLanguages).map(([language, code]) => (
                                        <option key={code} value={code}>
                                            {language}
                                        </option>
                                    ))}
                                </Input>
                            </FormGroup>
                        </Form>
                    </div>
                    <hr />
                    <div>
                        <h5>Output Audio Settings</h5>
                        <Form>
                            <FormGroup
                                row={false}
                                tag="fieldset"
                            >
                                <legend className="col-form-label col-sm-2">
                                    Voice
                                </legend>
                                <Col sm={10}>
                                    <FormGroup check>
                                        <Input
                                            name="radio2"
                                            type="radio"
                                            value="MALE"
                                            onChange={handleRadioChange}
                                            defaultChecked={settings.gender === "MALE"}
                                        />
                                        {' '}
                                        <Label check>
                                            Male
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Input
                                            name="radio2"
                                            type="radio"
                                            value="FEMALE"
                                            onChange={handleRadioChange}
                                            defaultChecked={settings.gender === "FEMALE"}
                                        />
                                        {' '}
                                        <Label check>
                                            Female
                                        </Label>
                                    </FormGroup>
                                </Col>
                            </FormGroup>

                            {/* Accent */}
                            <FormGroup>
                                <Label for="exampleSelect">
                                    Accent
                                </Label>
                                <Input
                                    id="exampleSelect"
                                    name="select"
                                    type="select"
                                    onChange={handleOutputAccentChange}
                                >
                                    <option value={settings.outputAccent}>{getKeyByValue(outputLanguages, settings.outputAccent)}</option>
                                    {Object.entries(outputLanguages).map(([language, code]) => (
                                        <option key={code} value={code}>
                                            {language}
                                        </option>
                                    ))}
                                </Input>
                            </FormGroup>
                        </Form>
                    </div>


                    <div >
                        <Button style={{ backgroundColor: '#52ab98', paddingLeft: 30, paddingRight: 30, border: 0 }} onClick={handleSaveClick}>
                            Save
                        </Button>
                    </div>


                </OffcanvasBody>
            </Offcanvas>
        </div>
    )
}

export default Settings