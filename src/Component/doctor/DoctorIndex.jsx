import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Doctorprofile from './DoctorProfile';
import AppointmentList from './AppointmentList';

export default function DoctorHome() {
  return (
    <section className='container' >
      <div className='row'>
        <div className='col border ' style={{ height:'400px'}}>
          <Doctorprofile />
        </div>
        <div className='col-12'>
          <AppointmentList />
        </div>

      </div>
    </section>
  )
}
