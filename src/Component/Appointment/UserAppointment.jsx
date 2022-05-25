import React, { useEffect, useState } from 'react';
import Appointment from './Appointment';
const axios = require('axios').default;

export default function UserAppointment() {
    const [app, setApp] = useState({});
    const [doctor, setDoctor] = useState({});

    const [error, setError] = useState();
    const id = sessionStorage.getItem("id");
    const [loading, setLoading] = useState(false);

    function fetchApp() {
        setLoading(true)
        axios.get(`/eachAppointment/?id = ${id}`)
            .then(function (response) {
                console.log("response",response)
                if (response.status == 200) {
                    
                    setApp(response.data[0])
                    setDoctor(response.data[1])
                }
                else if (response.status == 204) {
                    //console.log('this is insert case ');
                    setApp({})
                }
            })
            .catch(function (error) {
                setError(error);
                console.log(error);
            })
            .then(
                setLoading(false)
            )
    }
    useEffect(() => {
        fetchApp();
    }, [id])

    if (app)
        return (
            <div className=' m-3'>
                <h5 className=''> You have Appointment with : <u>Dr. {doctor.name} </u></h5>
                <h6>In the department: <u> {app.department} </u></h6>
                <p>Last visit date was : {app.date}</p>
                <small>**: Plsease visit hopistal for more details </small>

            </div>
        )
    else
        return (
            <Appointment />
        )
}
