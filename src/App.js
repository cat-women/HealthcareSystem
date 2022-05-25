import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import React, { Component } from 'react';
import './App.css';

import Loginform from './Component/Loginform'
import Registrationform from './Component/Registrationform'
import Sidebar from './Component/Sidebar';
import AboutUs from './Component/common/AboutUs';
import GuestUser from './Component/user/GuestUser';
import AllDoctor from './Component/doctor/Alldoctor';
import Dashboard from './Component/dashboard/Dashboard';
import UserProfile from './Component/user/UserProfile';
import DoctorHome from './Component/doctor/DoctorIndex';
import Contactus from './Component/common/Contact';
import Appointment from './Component/Appointment/addAppointment';
import Adddoctor from './Component/doctor/Adddoctor';
import Slide from './Component/common/Slide';
import DepartmentIndex from './Component/Department';
import Doctorprofile from './Component/doctor/DoctorProfile';

function setToken(data) {

  const userdata = JSON.parse(data);
  console.log("the token from ogin is " + userdata)
  sessionStorage.setItem('token', userdata.token)
  sessionStorage.setItem('name', userdata.name)
  sessionStorage.setItem('id', userdata.id)
  window.location.reload();

}
function App() {
  const token = sessionStorage.getItem("token");
  const userType = sessionStorage.getItem("type");
  const id = sessionStorage.getItem("id");
  const [error, setError] = useState();
  const [message, setMessage] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  useEffect(() => {
    //alert("session data", token)
  }, []);

  return (
    <>
      <Router>
        <Sidebar />

        {(error || message) &&
          <div className='message fw-bold ' style={error ? { color: 'red' } : { color: '#6ff7de' }} >
            <p >{error ? error : message}</p>
          </div>
        }
        <div className='container justify-contet-center'>

          <div className='row m-4'>
            <div className='col mt-4'>
              <Slide />
            </div>
          </div>
          {!token && (
            <div className='row m-4' id='login'>
              <div className='col mt-4'>
                {isLogin ?
                  <button onClick={(e) => setIsLogin(!isLogin)} style={{ float: 'right' }}>Register</button>
                  : <button onClick={(e) => setIsLogin(!isLogin)} style={{ float: 'right' }}>Login</button>
                }
                {isLogin &&
                  <Loginform setToken={setToken} setError={setError} setMessage={setMessage} setIsLogin={setIsLogin} />
                }
                {!isLogin &&
                  <Appointment />
                }
              </div>
            </div>
          )
          }
          {/* {token && userType === 'guest' && <GuestUser />} */}

        </div>
        <Routes>
          {token && <Route path="/makeappointment" element={<Appointment setIsLogin={setIsLogin} />} />}
          <Route path="/auth" element={<Loginform setToken={setToken} />} />
          <Route path="/doctors/alldoctors" element={<AllDoctor />} />
          <Route path="/Department" element={<DepartmentIndex />} />
          <Route path="/" />

          {userType === 'admin' && id > 0 && <Route path="/Patient/addAppointment" element={<addAppointment />} />}

          {userType === 'admin' && id > 0 && <Route path="/registration" element={<Registrationform />} />}

          {userType === 'admin' && id > 0 && <Route path="/addDoctor" element={<Adddoctor />} />}
          {userType === 'admin' && id > 0 && <Route path="/Dashboard" element={<Dashboard />} />}
          {userType === 'user' && id > 0 && <Route path="/userProfile" element={<UserProfile />} />}
          {userType === 'guest' && id > 0 && <Route path="/patientProfile" element={<GuestUser />} />}

          {userType === 'doc' && id > 0 && <Route path="/doctorProfile" element={<DoctorHome />} />}

          <Route path="/doctorProfile/:id" element={<Doctorprofile />} />

        </Routes>
        <AboutUs />
        <Contactus />
      </Router>
    </>

  );
}




export default App;