import React, { Component } from 'react'
import UserProfile from '../user/UserProfile'
import DoctorProfile from '../doctor/DoctorProfile'
const  userType = sessionStorage.getItem("userType");
export default class Index extends Component { 
  render() {
    return (
      <div>

        {(userType == 'guest') ?
          <DoctorProfile /> :
          <UserProfile />           
        }

      </div>
    )
  }
}
