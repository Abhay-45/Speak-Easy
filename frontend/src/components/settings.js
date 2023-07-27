import React, { useState } from 'react'
import { Offcanvas, OffcanvasHeader, OffcanvasBody, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, Col, Container } from 'reactstrap'
import { transcribeLanguages, outputLanguages } from '../constants/languges'

const Settings = ({ settingsOpen, setSettingsOpen }) => {

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
                                <Label for="exampleSelect">
                                    Accent
                                </Label>
                                <Input
                                    id="exampleSelect"
                                    name="select"
                                    type="select"
                                    onChange={handleAccentChange}
                                >
                                    <option value="en-US">English (United States)</option>
                                    {Object.entries(transcribeLanguages).map(([language, code]) => (
                                        <option key={code} value={code}>
                                            {language}
                                        </option>
                                    ))}
                                    {/* <option value="option-1">
                                        1
                                    </option >
                                    <option value="option-2">
                                        2
                                    </option>
                                    <option value="option-3">
                                        3
                                    </option>
                                    <option value="option-4">
                                        4
                                    </option>
                                    <option value="option-5">
                                        5
                                    </option> */}
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
                                            defaultChecked
                                            
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
                                    onChange={handleAccentChange}
                                >
                                    <option value="en-US">English (United States)</option>
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