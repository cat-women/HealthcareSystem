import React, { Component } from 'react'
import Alldoctor from '../../Component/doctor/Alldoctor';
import UserAppointment from '../Appointment/UserAppointment';
import Appointment from '../Appointment/Appointment';
import UserReport from './UserReport';


export default function GuestUser() {
  const id = sessionStorage.getItem("id");


  return (
    <div>
      <div class="container overflow-hidden">
        <div class="row md-4 mg-4 sm-6">
          <div class="col">
            <div class="p-3 border bg-light">
              <h3 className='text-center'>Your Appointment</h3> <hr />
              <UserAppointment />
            </div>
          </div>

        </div>
      </div>
      <UserReport index={id} />
    </div>
  )
}

