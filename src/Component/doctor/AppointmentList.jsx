import React, { useState, useEffect } from 'react'
import { ModalContext, ModalProvider, ModalRoot } from 'react-multi-modal';
import PatientDetail from './PatientDetail';
import MainContent from './ModalManager';



export default function AppointmentList() {
    const [error, setError] = useState();
    const [appointments, setAppointments] = useState([]);
    const id = sessionStorage.getItem("id");
    const requestJson = JSON.stringify({ 'id': id });
    const [lab, setLab] = useState({});
    const [report, setReport] = useState({});
    const [app, setApp] = useState({});
    const [showCom, setShowcomp] = useState(false);

    {/*To fetch appointment  */ }
    const fetchApp = async (e) => {
        try {
            const response = await fetch("/docApp", {
                method: "POST",
                body: requestJson,
            });
            const data = await response.text();
            if (await response.status === 200) {
                setAppointments(JSON.parse(data))
            } else {
                return false;
            }
        } catch (ex) {
            setError("Failed to post ");
            console.error("POST error!", ex);
        }

    }

    function openComponetn(data) {
        setApp(data);
        setShowcomp(!showCom);
    }

    useEffect(() => {
        fetchApp();

    }, [id, lab])


    return (
        <section>
            <div class="row ">
                <div class="col-xl-12 col-lg-12 col-md-12">
                    <div class="card teacher-card  mb-3">
                        <h6 style={{ textAlign: "center", lineHeight: "50px", flex: "1", fontWeight: "bold" }}>Your Today's Appointment</h6>

                        <div class="table-responsive-sm">
                            {appointments.length == 0 && <h1>You dont have any appointments </h1>}

                            {appointments.length > 0 && (
                                <table class="table table-bordered border-dark">
                                    <thead class="table-success">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Patients Name</th>
                                            <th scope="col">Department</th>
                                            <th scope="col">Type</th>
                                            <th scope="col">More</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            appointments.map(appointment => (
                                                <tr>
                                                    <th scope="row">{appointment.id}</th>
                                                    <td>{appointment.name}</td>
                                                    <td>{appointment.department}</td>
                                                    <td>{appointment.patient_type}</td>
                                                    <td>
                                                        <button className='btn btn-primary ' onClick={(e) => openComponetn(appointment)} >View Detail</button>
                                                    </td>

                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            )}

                        </div>
                    </div>
                </div>

                <div className='col' id="eachPatient">
                    {showCom && <PatientDetail appointment={app} lab={lab} setLab={setLab} report={report} />}
                    {showCom &&
                        <button className='btn btn-secondary' onClick={(e) => setShowcomp(false)}> close </button>
                    }
                </div>

            </div>
        </section>
    );
}



