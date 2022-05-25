import { Modal, Button } from 'react-bootstrap';
import React, { Component, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

function Appointment(props) {
    const [userType, setUserType] = useState("new");
    const [doctors, setDoctors] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [show, setShow] = useState(false);
    const [prevData, setPrevData] = useState({ id: "", email: "" });
    const [user, setUser] = useState([]);
    const [formData, setFormData] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleUserType = (e) => {
        if (userType === "old") {
            console.log("show", show)
            setShow(true)
        } else
            setShow(false)
    }

    const fetchData = () => {
        fetch("/finddoctor")
            .then(response => {
                return response.json()
            })
            .then(data => {
                setDoctors(data)
                setFetching(false)
            })
            .catch((e) => console.log(e))
    }

    const fetchUser = async (e) => {
        e.preventDefault();
        setShow(false);
        const requestJson = JSON.stringify(prevData);
        console.log("formdata ", requestJson);
        try {
            const response = await fetch("/finduser", {
                method: "POST",
                body: requestJson,
            });
            const responseText = await response.text();
            setUser(JSON.parse(responseText))

            setFetching(false);
        } catch (ex) {
            console.error("POST error!", ex);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("formdaa", formData);
        const requestJson = JSON.stringify(formData);
        try {
            const response = await fetch("/appointment", {
                method: "POST",
                body: requestJson,
            });
            const responseText = await response.text();
            setFetching(false);
            //console.log(responseText);
            return <Navigate to='/auth' />

        } catch (ex) {
            console.error("POST error!", ex);
        }


    }
    useEffect(() => {
        const unsubscribe = fetchData();
        return unsubscribe;
    }, [fetching])

    useEffect(() => {
        setFormData({
            ...formData,
            patience_id: user.id,
            patient_type: 'old'
        })

        console.log("user ", user)

    }, [user])
    return (
        <section className='bg-light'>

            <div className='d-flex justify-content-center mt-4 mb-2'>
                <h3 className='text-center text-dark bg-light' style={{ width: 'fit-content', alignSelf: 'center' }}>Appointment Booking</h3>
            </div>           
            <form onSubmit={handleSubmit}
                method="POST">
                <div className='form-inner'>
                    <div className="row">
                        <div className="col m-3">
                            <input className="form-check-input m-3"
                                name='userType'
                                type="radio"
                                onChange={(e) => setFormData({ ...formData, patience_id: null, patient_type: 'new' })}
                                value="new " />
                            <label className="form-check-label m-3" for="flexRadioDefault1" >
                                New
                            </label>
                            <input className="form-check-input m-3"
                                type="radio"
                                name='userType'
                                onChange={handleShow}
                                value="old" />
                            <label className="form-check-label m-3" for="flexRadioDefault2">
                                Existing
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col  m-3">
                            <label htmlFor='Name'>Full Name</label>
                            <input type="text" class="form-control" placeholder="Full name" aria-label="Full name"
                                name='name'
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}

                            />
                        </div>
                        <div className="col  m-3">
                            <label htmlFor='Phone number'>Phone number</label>
                            <input type="text" class="form-control" placeholder="Phone number" aria-label="phone number"
                                name='contact'
                                value={formData.contact}
                                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                            />
                        </div>
                        <div className="row">
                            <div className="col  m-3">
                                <label htmlFor='Email address'>Email Address</label>
                                <input type="eamil" class="form-control" placeholder="Email Address" aria-label="Email Address"
                                    name='email'
                                    value={formData.emai}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div className="col m-3">
                                <label htmlFor='Gender' className='m-3'>Gender</label>
                                <input className="form-check-input m-3" type="radio"
                                    name="gender" id="male"
                                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                    value="male" />
                                <label className="form-check-label m-3" for="flexRadioDefault1" >
                                    Male
                                </label>
                                <input className="form-check-input m-3" type="radio"
                                    name="gender" id="female"
                                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                    value="female" />
                                <label className="form-check-label m-3" for="flexRadioDefault2">
                                    Female
                                </label>
                            </div>

                            <div className='row'>
                                <div className='col  m-3'>
                                    <label htmlFor='Select Reason'>Select Department</label>
                                    <select class="form-select" id="floatingSelect" aria-label="Floating label select example"
                                        name='department'
                                        value={formData.department}
                                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}

                                    >
                                        <option selected>Select Department</option>
                                        <option value="Radiologist">Radiologist</option>
                                        <option value="Internal Medicine">Internal Medicine</option>
                                        <option value="Gynecologist">Gynecologist</option>
                                        <option value="Breast Cancer Specilist">Breast Cancer Specilist</option>
                                        <option value="Pediatrician">Pediatrician</option>
                                        <option value="Neuropsychaiatrist">Neuropsychaiatrist</option>
                                        <option value="Other">Other</option>

                                    </select>
                                </div>
                                <div className='col'>
                                    <label htmlFor='Select Doctor'>Select Doctor</label>
                                    {doctors.length > 0 && (
                                        <select class="form-select" id="floatingSelect" aria-label="Floating label select example"
                                            name='doctor_id'
                                            value={formData.doctor_id}
                                            onChange={(e) => setFormData({ ...formData, doctor_id: e.target.value })}>
                                            {
                                                doctors.map(doctor => (
                                                    <option key={doctor.id} value={doctor.id}>{doctor.name} ||
                                                        Available time : {doctor.time}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    )}
                                </div>
                                <div className='row'>
                                    <div className='col  m-3'>
                                        <label for="admitdate" class="form-label">Appointment Date  </label>
                                        <input type="date" class="form-control" id="admitdate"
                                            name='date'
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        />

                                    </div>
                                    <div className='col  m-3'>
                                        <label for="admittime" class="form-label">Appointment time  </label>
                                        <input type="time" class="form-control" id="admittime" name='time' />

                                    </div>

                                </div>

                                <div className='row'>
                                    <div className='col  m-3'>
                                        <label for="Textarea" class="form-label">Add Note</label>
                                        <textarea class="form-control" id="Textarea" rows="3"></textarea>
                                    </div>
                                </div>




                            </div>


                        </div>
                    </div>

                    <input type="submit" value="Submit"></input>
                </div>
            </form>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter your detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label className='m-3'> Email</label>
                    <input type="email" placeholder="email that you used previousy" className='m-3'
                        name='email'
                        value={prevData.email}
                        onChange={(e) => setPrevData({ ...prevData, email: e.target.value })}
                    />
                    <h6 className='text-center fw-bold'>Or</h6>
                    <label className='m-3'> Id</label>
                    <input type="number" placeholder="your id " className='m-3' min="1"
                        name='id'
                        value={prevData.id}
                        onChange={(e) => setPrevData({ ...prevData, id: e.target.value })}
                    /> <br />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className='btn btn-danger' onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="secondary" className='btn btn-primary' onClick={fetchUser}>
                        save
                    </Button>
                </Modal.Footer>
            </Modal>
        </section>
    );



}
export default Appointment;