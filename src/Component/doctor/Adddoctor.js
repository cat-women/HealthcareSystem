import React, { Component, useEffect, useState } from 'react'
import storage from '../../firebase/config';
import { async } from '@firebase/util';
import firebase from 'firebase/app';
import 'firebase/storage';
import useStorage from '../../firebase/useStorage';
import ProgressBar from '../common/progress';
function Adddoctor() {
    const [formData, setFormData] = useState({
        name: "",
        citizenship: "",
        email: "",
        contact: "",
        address: "",
        specialization: "",
        nmc_no: "",
        qualification: "",
        charge: "",
        gender: "",
        image: "",
        isAvailable: ""

    });

    //to show iamge 
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [file, setFile] = useState("");
    const types = ['image/png', 'image/jpeg'];
    const [error, setError] = useState();
    let fileInput = React.createRef();

    //take image and show 
    const handleImageChange = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let inFile = e.target.files[0];
        if (inFile && types.includes(inFile.type)) {
            setFile(inFile)
            reader.onloadend = () => {
                setImagePreviewUrl(reader.result);
            };
            reader.readAsDataURL(inFile);
        } else {
            setError("file is not selected");
            setFile(null);
            return false;
        }
    };

    const getUrl = (url) => {
        setFormData({
            ...formData,
            image: url
        })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const requestJson = JSON.stringify(formData);
        console.log("formdata ", requestJson);
        try {
            const response = await fetch("/doctor", {
                method: "POST",
                body: requestJson,
            });
            const responseText = await response.text();
            console.log(responseText);
            if (await response.status == 417) {
                console.log("failed ")
            }
        } catch (ex) {
            console.error("POST error!");
        }
    }


    return (
        <section>
            <div className='m-5'>
                <div className='row'>
                    <h2 className='d-flex justify-content-center fw-bold m-5'> Add Doctor</h2>
                </div>
                <div className='row d-flex justify-content-center  '>
                    <form className='' style={{ width: '80%' }} onSubmit={handleSubmit}>
                        <div className='form-inner '>
                            <h4 className='fw-bold mb-5 text-center'>Doctor Details</h4>
                            <div className="row">
                                <div className="col m-3">
                                    <label htmlFor='Name'>First Name</label>
                                    <input type="text" className="form-control" placeholder="First name" aria-label="First name"
                                        name='name'
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        value={formData.name}
                                    />
                                </div>
                                <div className="col m-3">
                                    <label htmlFor='citizen'>Citizenship No</label>
                                    <input type="text" className="form-control" placeholder="Citizenship No" aria-label="Last Name"
                                        name='citizen'
                                        onChange={(e) => setFormData({ ...formData, citizenship: e.target.value })}
                                        value={formData.citizenship}
                                    />
                                </div>
                                <div className="row">
                                    <div className="col m-3">
                                        <label htmlFor='Email address'>Email Address</label>
                                        <input type="email" className="form-control" placeholder="Email Address" aria-label="Email Address"
                                            name='email'
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            value={formData.email}
                                        />
                                    </div>
                                    <div className="col m-3">
                                        <label htmlFor='phone number'>Phone Number</label>
                                        <input type="text" className="form-control" placeholder="Phone Number" aria-label="Phone number"
                                            name='contact'
                                            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                                            value={formData.contact} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col m-3 ">
                                        <label for="admitdate" className="form-label">Address  </label>
                                        <input type="text" className="form-control" id="admitdate" required
                                            name='address'
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            value={formData.address} />

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
                                </div>
                                <div className="row">
                                    <div className="col m-3">
                                        <label htmlFor='Email address'>NMC no.</label>
                                        <input type="number" className="form-control" placeholder="NMC no" aria-label="NMC no"
                                            name='nmc_no'
                                            onChange={(e) => setFormData({ ...formData, nmc_no: e.target.value })}
                                            value={formData.nmc_no} />
                                    </div>
                                    <div className="col m-3">
                                        <label htmlFor='phone number'>Specialization</label>
                                        <input type="text" className="form-control" placeholder="Specilization" aria-label="Specilization"
                                            name='specilization'
                                            onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                                            value={formData.specialization} />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col m-3">
                                        <label htmlFor='Email address'>Qualificaction</label>
                                        <input type="text" className="form-control" placeholder="Qualificaction" aria-label="Qualificaction"
                                            name='qualificaction'
                                            onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                                            value={formData.qualification} />
                                    </div>
                                    <div className="col m-3">
                                        <label htmlFor='phone number'>Charge</label>
                                        <input type="number" className="form-control" placeholder="Charge" aria-label="Charge"
                                            name='charge'
                                            onChange={(e) => setFormData({ ...formData, charge: e.target.value })}
                                            value={formData.charge} />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="col m-3 d-flex justify-content-left">
                                        <label for="available " className="form-label ml-0 mr-3">Cuurently available ? :  </label>
                                        <span className='m-4'></span>
                                        <label className="form-check-label  ml-4 pl-3" for="flexRadioDefault1" >
                                            Yes
                                        </label>
                                        <input className="form-check-input ml-3" type="radio"
                                            name="isAvailable" id="male"
                                            onChange={(e) => setFormData({ ...formData, isAvailable: e.target.value })}
                                            value={true} />
                                        <label className="form-check-label pl-3" for="flexRadioDefault2">
                                            No
                                        </label>
                                        <input className="form-check-input " type="radio"
                                            name="isAvailable" id="female"
                                            onChange={(e) => setFormData({ ...formData, isAvailable: e.target.value })}
                                            value={false} />

                                    </div>
                                    <div className="col m-3 d-flex justify-content-left">
                                        
                                        <label for="available " className="form-label m-3 ">From  </label> 
                                        
                                        <input type="time" name='from' id='from'
                                            onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                                            value={formData.from}
                                        />
                                         <label for="available " className="form-label m-3"> - </label> 
                                        <input type="time" name='to' id='to'
                                            onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                                            value={formData.to}
                                        />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="col mt-3">
                                        <label for="admittime" className="form-label"> Upload Image</label>

                                        <input type="file" className="form-control" id="image"
                                            name='image'
                                            accept='image/*'
                                            onChange={handleImageChange}
                                            ref={fileInput} />
                                        <label for="notice" className="form-label fw-light fst-italic " style={{ color: 'green' }}> Image size should be less than 1KB </label>

                                    </div>

                                    <div className="col mt-3">
                                        {file &&
                                            <ProgressBar file={file} setFile={setFile} sendUrl={getUrl} />
                                        }
                                        <img
                                            src={imagePreviewUrl}
                                            alt="..." style={{ height: '50px', width: '50px' }}
                                        />
                                        <span id='imageError' style={{ color: 'red' }}></span>
                                    </div>
                                </div>
                                <div className='col mt-3  d-flex justify-content-center'>
                                    <input type="submit" value="Submit" className='m-3 btn btn-primary '></input>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );

}
export default Adddoctor;