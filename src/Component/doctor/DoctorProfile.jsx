import React, { Component, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
const Doctorprofile = (props) => {
    const [doctor, setDoctor] = useState({});
    const [error, setError] = useState();

    const url = useParams();
    const urlId = JSON.stringify(url);
    let id = urlId[urlId.length - 3];

    if (id === undefined) {
        id = sessionStorage.getItem("id");
    }
    const requestJson = JSON.stringify({ 'id': id });

    const userType = sessionStorage.getItem("type");

    const fetchDoctor = async (e) => {
        try {
            const response = await fetch("/finddoctor", {
                method: "POST",
                body: requestJson,
            });
            const data = await response.text();

            if (await response.status == 200) {
                setDoctor(JSON.parse(data))
            } else {
                alert(" data Doesnt exit ");
                return false;
            }
        } catch (ex) {
            setError("Failed to post ");
            console.error("POST error!", ex);
        }


    }

    useEffect(() => {
        fetchDoctor();
    }, [id])

    return (
        <section>
            <div class="body d-flex py-3">
                <div class="container-xxl">
                    <div class="row g-3">
                        <div class="col-xl-12 col-lg-12 col-md-12">
                            <div class="card   mb-3">
                                <div class="card-body d-flex teacher-fulldeatil">
                                    <div class="profile-teacher pe-xl-4 pe-md-2 pe-sm-4 pe-4 text-center w220">
                                        <img src={doctor.image} width="200" height="200" alt='doctor profile ' />
                                        <div class="about-info d-flex align-items-center mt-3 justify-content-center flex-column">
                                            <span class="text-muted small">Doctor ID : PXL-{doctor.id}</span>
                                            {userType === 'doc' &&
                                                <button type="button" class="btn btn-primary" mx-3 data-bs-toggle="modal" data-bs-target="#exampleModal" >
                                                    Edit
                                                </button>
                                            }
                                        </div>
                                        <div class="about-info d-flex align-items-center mt-3 justify-content-center flex-column">


                                        </div>
                                    </div>
                                    <div class="teacher-info border-start ps-xl-4 ps-md-4 ps-sm-4 ps-4 w-100">
                                        <h6 class="mb-0 mt-2  fw-bold d-block fs-6">Dr. {doctor.name}</h6>
                                        <span class="py-1 fw-bold small-11 mb-0 mt-1 text-muted">{doctor.specialization}</span>
                                        <p style={{
                                            display: 'flex',
                                            alignItems: 'left',
                                            justifyContent: 'left',
                                            marginTop: '5px',
                                        }}>
                                            Senior Consultant Physician, Best Gastroenterologist and Hepatologist in Nepal<br />
                                            Department : General Physician | Gastroenterology | Hepatology<br />
                                            NMC No : {doctor.nmc_no}<br />
                                            Qualification : {doctor.qualification}<br />
                                            OPD Schedule : Sun - Fri : 5:30 pm to 8 pm</p>
                                        <div class="row g-2 pt-2">
                                            <div class="col-xl-5">
                                                <div class="d-flex align-items-center">
                                                    <span class="ms-2">202-555-0174 </span>
                                                </div>
                                            </div>
                                            <div class="col-xl-5">
                                                <div class="d-flex align-items-left">
                                                    <span class="ms-2">{doctor.email}</span>
                                                </div>
                                            </div>
                                            <div class="col-xl-5">
                                                <div class="d-flex align-items-left">

                                                    <span class="ms-2">19/03/1980</span>
                                                </div>
                                            </div>
                                            <div class="col-xl-5">
                                                <div class="d-flex align-items-center">
                                                    <i class="icofont-address-book"></i>
                                                    <span class="ms-2">2734</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title text-center" id="exampleModalLabel">Update your Profile</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="mb-3">
                                    <label for="text" class="form-label">Full name</label>
                                    <input type="text" class="form-control" id="text" />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">Phone Number</label>
                                    <input type="phonenumber" class="form-control" id="exampleInputPassword1" />
                                </div>
                                <div class="mb-3">
                                    <label for="Textarea" className="form-label">Add Note</label>
                                    <textarea className="form-control" id="Textarea" rows="3"></textarea>
                                </div>
                            </form>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Save Changes</button>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


export default Doctorprofile;