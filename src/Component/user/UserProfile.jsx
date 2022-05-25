import React, { useState, useEffect } from 'react'
import { ModalContext, ModalProvider, ModalRoot } from 'react-multi-modal';
import MainContent from './UserModalManger';
import AllAppointment from '../Appointment/AllAppointment';
import '../../App.css';
const axios = require('axios').default;


export function UserProfile() {
  const [labs, setLabs] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lab,setLab] = useState({});
  const id = 1;
  const username = sessionStorage.getItem("name")

  function fetchLab() {
    setLoading(true)
    axios.get(`/eachLab/`)
      .then(function (response) {
        if (response.status == 200) {
          //console.log("response lab ", response.data);
          setLabs(response.data)
        }

      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        setLoading(false)

      });
  }
  useEffect(() => {
    fetchLab();
  }, [])


  return (
    <div className='container'>
      <div className='col-12'>
        <AllAppointment />
      </div>
      <div className='col bg-light mt-4' >
        {labs.length > 0 && <u> <h3 className='text-center'>Lab report(s) to be updated </h3></u>}
        {labs.length > 0 && (
          <table className='table'>
            <thead>
              <tr>
                <th>#</th>
                <th>Test name </th>
                <th>Result</th>
                <th>Prescribed by</th>
                <th>Update/delete</th>
              </tr>

            </thead>
            <tbody>
              {labs.map((lab, index) => (
                <tr key={index}>
                  <th> {index + 1}</th>
                  <th>{lab.test_name}</th>

                  {lab.result && <th> {lab.result} </th>}
                  {!lab.result && <th ><small> (Need to update ) </small></th>}
                  <th>{lab.doctorName}</th>
                  <th>

                    <div className='col-12 m-3'>
                      {/* update  */}

                      <ModalProvider>
                        <MainContent index={lab.id} lab={lab} setLab={setLab}  />
                        <ModalRoot />
                      </ModalProvider>
                    </div>
                  </th>

                </tr>

              ))}
            </tbody>

          </table>
        )}

      </div>

    </div >

  )
}

export default UserProfile