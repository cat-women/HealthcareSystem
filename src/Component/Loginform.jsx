import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

import '../App.css'

export default function Loginform(props) {
    const [details, setDetails] = useState({});
    const [patient, setPatient] = useState({});
    const [doctor, setDoctor] = useState({});
    const [userType, setUserType] = useState("guest");
    const [isActive, setIsAtive] = useState(true);
    const [isLoading, setIsLoading] = useState(false)

    const sumbitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const requestJson = JSON.stringify(details);
        try {
            const response = await fetch("/login", {
                method: "POST",
                body: requestJson,
            });
            const token = await response.text();
            //console.log("token", token);

            if (await response.status === 200) {
                const code = prompt('Please code that sent to your mail')
                const data = JSON.parse(token)
                if (code == data.token) {
                    sessionStorage.setItem('type', data.userType)
                    props.setToken(token);
                    props.setMessage("You are logged in !")
                    setIsLoading(false);
                    return <Navigate to='/Dashboard' />
                } else {
                    alert("code did not match. Try again ");
                    props.setMessage("COde did not matched ")
                    setIsLoading(false);
                    return false;
                }
            }
            if (await response.status === 500) {
                props.setError("Something wrong with server");
                return false
            }
            if (await response.status === 404) {
                props.setError("user doesn't exit try again !");
                return false
            }

            //console.log(await response.status)
        } catch (ex) {
            props.setError("Failed to post ");
            console.error("POST error!", ex);
            setIsLoading(true);
        } finally {
            setIsLoading(false)
        }
    }
    const doctorAuth = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const requestJson = JSON.stringify(doctor);

        try {
            const response = await fetch("/authdoctor", {
                method: "POST",
                body: requestJson,
            });
            const token = await response.text();
            //console.log("token", token);
            //props.setToken(token);
            if (await response.status == 200) {
                const code = prompt('Please code that sent to your mail')
                if (code == JSON.parse(token).token) {
                    props.setToken(token);
                    props.setMessage("you are logged in 1")
                    sessionStorage.setItem('type', "doc")
                    setIsLoading(false);
                    //  this.props.history.push('/doctorProfile')
                } else {
                    alert("code did not match. Try again ");
                    setIsLoading(false);
                    props.setError("code not matched ")
                    return false;
                }
            }
        } catch (ex) {
            props.setError("Failed to post ");
            console.error("POST error!", ex);
            setIsLoading(false);
        }

    }
    const patientAuth = async (e) => {
        e.preventDefault();
        const requestJson = JSON.stringify(patient);
        try {
            const response = await fetch("/authpatient", {
                method: "POST",
                body: requestJson,
            });
            const token = await response.text();
            //console.log("token", token);

            if (await response.status == 200) {
                const userdata = JSON.parse(token)
                props.setToken(token);
                sessionStorage.setItem('type', "guest")
                sessionStorage.setItem('id', userdata.id)
                sessionStorage.setItem('name', userdata.name)
                props.setMessage("You are logged in, Welcome !")
                setIsLoading(false);

            }
            if (await response.status == 204) {
                console.log("data not found ")
                props.setError("Data doesnt exit ");
            }

        } catch (ex) {
            props.setError("Failed to post ");
            console.error("POST error!", ex);
            setIsLoading(true);
        }
    }


    return (
        <div className='bg-light m-3' >
            <h1 className='text-center fw-bold mb-3'>Login</h1>
            <hr />
            <div className='row ml-4'>
                <div className='col'>
                    <button className={isActive ? 'btn btn-primary' : 'btn btn-primary'} onClick={(e) => (setUserType("guest"), setIsAtive(!isActive))}>Login as Patient</button>
                </div>

                <div className='col'>
                    <button className={isActive ? 'btn btn-primary' : 'btn btn-secondary'} onClick={(e) => (setUserType("staff"), setIsAtive(!isActive))}>Login as Staff </button>
                </div>
                <div className='col'>
                    <button className={isActive ? 'btn btn-success' : 'btn btn-secondary'} onClick={(e) => (setUserType("doctor"), setIsAtive(!isActive))}>Login as Doctor </button>
                </div>

            </div>
            <h6 className='text-center fw-bold font-italic' style={{ color: 'green' }}>Logging in as {userType}</h6>
            <div className='row m-1'>
                <div className='col'>
                    {/*for for patient */}
                    {(userType === "guest") &&
                        <form onSubmit={sumbitHandler} >
                            <div className='form-inner'>
                                <div className='form-group'>
                                    <label htmlFor='name'>Email:</label>
                                    <input type="text" name='name' id="name"
                                        onChange={(e) => setPatient({ ...patient, email: e.target.value })}
                                        value={patient.email} />

                                </div>
                                <div className='form-group'>
                                    <label htmlFor='password'>Password:</label>
                                    <input type="password" name='password' id="password"
                                        onChange={(e) => setPatient({ ...details, contact: e.target.value })}
                                        value={patient.contact} />
                                </div>
                                <button className='btn btn-success m-3' type="submit" value="Login" onClick={patientAuth}>Login </button>
                                {isLoading && <span>Authenticating  .... </span>}
                            </div>
                        </form>
                    }
                    {/*for staff */}
                    {(userType === 'staff') &&
                        <form onSubmit={sumbitHandler} >
                            <div className='form-inner'>
                                <div className='form-group'>
                                    <label htmlFor='name'>Email:</label>
                                    <input type="text" name='name' id="name"
                                        onChange={(e) => setDetails({ ...details, email: e.target.value })}
                                        value={details.username} />

                                </div>
                                <div className='form-group'>
                                    <label htmlFor='password'>Password:</label>
                                    <input type="password" name='password' id="password"
                                        onChange={(e) => setDetails({ ...details, password: e.target.value })}
                                        value={details.password} />
                                </div>
                                <button className='btn btn-success m-3' type="submit" value="Login">Login </button>
                                {isLoading && <span>Authenticating  .... </span>}
                            </div>
                        </form>
                    }

                    {(userType === 'doctor') &&
                        <form onSubmit={doctorAuth} >
                            <div className='form-inner'>
                                <div className='form-group'>
                                    <label htmlFor='name'>Email:</label>
                                    <input type="text" name='nmc_no' id="name"
                                        onChange={(e) => setDoctor({ ...doctor, email: e.target.value })}
                                        value={doctor.email} />

                                </div>
                                <div className='form-group'>
                                    <label htmlFor='password'>Password:</label>
                                    <input type="password" name='email' id="password"
                                        onChange={(e) => setDoctor({ ...doctor, nmc_no: e.target.value })}
                                        value={doctor.nmc_no} />
                                </div>
                                <button className='btn btn-success m-3' type="submit" value="Login">Login </button>
                                {isLoading && <span>Authenticating  .... </span>}
                            </div>
                        </form>

                    }
                    <div className='d-flex justify-content-center m-3'>
                        <span className='m-2' style={{ color: "#34e80c" }} >New here ? </span>

                        <button className='btn bg-primary ' onClick={(e) => props.setIsLogin(false)} >Register </button>

                    </div>
                </div>
            </div>

        </div>
    )
}
