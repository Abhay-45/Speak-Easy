import React, { useState } from 'react'
import output from '../constants/output'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, Col, Container } from 'reactstrap';
import COLORS from '../constants/theme';
import ReactAudioPlayer from 'react-audio-player';

const OutPut = ({outPutAudioUrl}) => {
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
        <div className="mt-5 p-4" style={{backgroundColor: COLORS.GRAY4}}>
            <h3 className='pb-'>Output</h3>

            <Button color="danger" onClick={toggle}>
                Output Audio Settings
            </Button>
            <Modal isOpen={modal} toggle={toggle} centered={true}>
                <ModalHeader toggle={toggle}>Audio Settings</ModalHeader>
                <ModalBody>
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
                                <FormGroup
                                    check>
                                    <Input
                                        name="radio2"
                                        type="radio"
                                        value="NEUTRAL"
                                        onChange={handleRadioChange}
                                    />
                                    {' '}
                                    <Label check>
                                        Neutral
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
                                <option value="option-1">
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
                                </option>
                            </Input>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button style={{ backgroundColor: '#52ab98' }} onClick={handleSaveClick}>
                        Save
                    </Button>
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>

            <Container>
                {outPutAudioUrl != null && (
                    <div className="mt-4">
                        <ReactAudioPlayer style={{color:COLORS.PRIMARY}}src={outPutAudioUrl} autoPlay={false} controls />
                    </div>
                    
                )}
            </Container>
        </div>
    )
}

export default OutPut