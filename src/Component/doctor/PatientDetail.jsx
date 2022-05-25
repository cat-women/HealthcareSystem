import React, { useEffect, useState } from 'react'
import { ModalContext, ModalProvider, ModalRoot } from 'react-multi-modal';
import MainContent from './ModalManager';
import UserReport from '../user/UserReport';



export default function PatientDetail(props) {
    const [app, setApp] = useState(props.appointment)
    const id = sessionStorage.getItem("id") ;
    const [lab, setLab] = useState({app_id:app.id,doctor_id:id} )
    const [report, setReport] = useState({app_id:app.id,doctor_id:id})
    
    useEffect(() =>{

    },[lab])

    return (
        <div className='containter'>
            <div className='row d-flex justify-content-center'>
                <div className='col-4 m-3'>
                    <h5>Patient name : {app.name}</h5>
                    <h6>Contact:  </h6>
                    <p>Phone no: {app.contact} <br />
                        Email: {app.email}
                    </p>
                    {app.last_vitite_date &&
                        <p>Late visited : {app.last_vitite_date}</p>
                    }
                </div>
                <div className='col-12 m-3'>
                    {/* Update  */}
                    <UserReport index={app.id} />
                </div>

                <div className='col-12 m-3'>
                    {/* new lab report and report */}
                    <ModalProvider>
                        <MainContent index={app.id} lab={lab} setLab={setLab} report={report} />
                        <ModalRoot />
                    </ModalProvider>
                </div>

            </div>
        </div>
    )
}
