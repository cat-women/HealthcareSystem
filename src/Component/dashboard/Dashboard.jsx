import React, { useEffect, useState } from 'react'
import ViewUsers from './ViewUsers';
import ViewDoctors from './ViewDoctors';
const axios = require('axios').default;

export default function Dashboard() {
    const id = 1
    const [doctors, setDoctors] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    return (
        <div>
            <div className='row'>
                { /* list of users*/}
                <div className='col m-3'>
                    <ViewUsers />
                </div>
                { /* list of doctors*/}
                <div className='col m-3'>
                    <ViewDoctors />
                </div>

            </div>
            <div className='row'>
                <div className='col ' style={{ alignSelf: "center" }}>

                    <a href="http://localhost:3000/addDoctor">
                        <button type='button' className='btn btn-primary  m-3'>
                            Add Doctor
                        </button>
                    </a>


                    <a href="http://localhost:3000/registration">
                        <button type='button' className='btn btn-primary  m-3'>Add Staff</button>
                    </a>

                </div>
            </div>
        </div>
    )
}
