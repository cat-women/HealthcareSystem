import { Modal, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

function LabModal({ isOpen, hideModal, data }) {
    const [error, setError] = useState();
    const axios = require('axios').default;
    const [lab, setLab] = useState(data);

    const saveData = async (e) => {
        e.preventDefault();
        console.log("the data to be upded ", lab)
        if (lab.test_name != null) {
            try {
                const requestJson = JSON.stringify(lab);
                let response;

                if (lab.id == undefined) {
                    console.log('going to insert ')
                    const response = await fetch("/lab/", {
                        method: "POST",
                        body: requestJson,

                    });
                } else {
                    console.log('going to update ')
                    const response = await fetch(`/updateLab/`, {
                        method: "POST",
                        body: requestJson,

                    });
                }

                const data = await response.text();
                if (await response.status === 200) {
                    console.log('action success ')
                    alert("Action sucess");
                    window.location.reload();

                } else {
                    return false;
                }
            } catch (ex) {
                setError("Failed to post ");
                console.error("POST error!", ex);
            } finally {
                hideModal()
            }

        } else {
            setError("Can't submit empty form ");
        }
    }

    return (
        isOpen && (
            <Modal show={isOpen} onHide={hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>lab Report </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className='md-4' >
                        <label className='m-3 form-label'> Test name(s)  </label>
                        <input type="text" placeholder="list all the symptopms " className='m-3 form-control'
                            value={lab.test_name}
                            onChange={(e) => setLab({ ...lab, test_name: e.target.value })}
                        />
                    </div>

                    <div className='md-4' >
                        <label className='m-3 form-label'> Result  </label>
                        <input type="text" placeholder="list all the symptopms " className='m-3 form-control'
                            value={lab.result}
                            onChange={(e) => setLab({ ...lab, result: e.target.value })}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className='btn btn-danger' onClick={hideModal}>
                        Cancel
                    </Button>
                    <Button variant="secondary" className='btn btn-primary' onClick={saveData}>
                        save
                    </Button>
                </Modal.Footer>
            </Modal>

        )
    );
}
export default LabModal;