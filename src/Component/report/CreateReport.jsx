import { Modal, Button } from 'react-bootstrap';
import React, { useState } from 'react'
import { ModalContext, ModalProvider, ModalRoot } from 'react-multi-modal';


function ReportModal({ isOpen, data, hideModal }) {
    const [error, setError] = useState();
    const axios = require('axios').default;
    const [report, setReport] = useState(data);

    const saveData = async (e) => {
        e.preventDefault();
        console.log("the data to be upded ", report)
        if (report.symptoms != null) {
            try {
                const requestJson = JSON.stringify(report);
                let response;

                if (report.id == undefined) {
                    console.log('going to insert ')
                    const response = await fetch("/report/", {
                        method: "POST",
                        body: requestJson,

                    });
                } else {
                    console.log('going to update ')
                    const response = await fetch(`/updateReport/`, {
                        method: "POST",
                        body: requestJson,

                    });
                }

                const data = await response.text();
                if (await response.status === 200) {
                    console.log('action success ')
                } else {
                    return false;
                }
            } catch (ex) {
                setError("Failed to post ");
                console.error("POST error!", ex);
            }finally{
                
            }

        } else {
            setError("Can't submit empty form ");
        }
    }
    return isOpen &&
        (
            <Modal show={isOpen} onHide={hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>report </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="mb-3">
                        <label className='m-3 form-label'> Symptoms </label>
                        <input type="text" placeholder="list all the symptopms " className='form-control m-3'
                            name='symptoms'
                            value={report.symptoms}
                            onChange={(e) => setReport({ ...report, symptoms: e.target.value })}

                        />
                    </div>
                   
                    <div class="mb-3">
                        <label className='m-3 form-label'> Conclusion </label>
                        <input type="text" placeholder="conclusion  " className='form-control m-3'
                            name='result'
                            value={report.result}
                            onChange={(e) => setReport({ ...report, result: e.target.value })}

                        />
                    </div>
                    <div class="mb-3">
                        { report.nextDate && 
                        <span >Previos date given is  {report.nextDate}</span>  } <br/>
                        <label className='m-3 form-label'> Next visit date  </label>
                        <input type="date" placeholder="yyyy-mm-dd" className='form-control m-3'
                             min="2017-04-01"
                            name='nextDate'
                            value={report.nextDate}
                            onChange={(e) => setReport({ ...report, nextDate: e.target.value })}

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

        );
}


export default ReportModal;