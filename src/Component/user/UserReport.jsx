import React, { useEffect, useState } from 'react';
import { ModalContext, ModalProvider, ModalRoot } from 'react-multi-modal';
import MainContent from './UserModalManger';
import ReportModalManager from '../report/ReportModalManager';
const axios = require('axios').default;


export default function UserReport(props) {
    const [labs, setLabs] = useState([]);
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [lab, setLab] = useState(props.lab);
    const [report, setReport] = useState(props.report);
    const userType = sessionStorage.getItem("type")
    function fetchLab() {
        setLoading(true)
        axios.get(`/AllLab/?id = ${props.index}`)
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
    function fetchReport() {
        setLoading(true)
        axios.get(`/AllReport?reports.app_id = ${props.index}`)
            .then(function (response) {
                if (response.status == 200) {
                    console.log("response report ", response);
                    setReports(response.data)
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
        fetchReport();
    }, [])
    console.log(labs)
    return (
        <div className='container  mt-5'>
            <div className='row d-flex justify-content-center '>

                <div className='col-12 p-3 bg-light'>
                    {reports.length > 0 && <u><h3 className='text-center fw-bold'>Your report is </h3></u>}
                    {reports.length > 0 &&
                        <table className='table m-4'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Symptoms</th>
                                    <th>Result</th>
                                    <th>Medicine</th>
                                    <th>Prepared by </th>
                                    <th>Next Visit Date</th>
                                    {userType === 'doc' && <th>Update/delete</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {reports.map((report, index) => (
                                    <tr>
                                        <th>{index + 1}</th>
                                        <th>{report.symptoms}</th>
                                        <th>{report.result}</th>
                                        <th> {report.medicine}</th>
                                        <th>{report.name}</th>
                                        <th>{report.nextDate}</th>
                                        {userType === 'doc' && <th>
                                            <ReportModalManager report={report} setReport={setReport} />
                                        </th>}
                                    </tr>

                                ))
                                }
                            </tbody>
                        </table>

                    }
                </div>
                <hr />
                <div className='col-12 mt-3 bg-light'>
                    {labs.length > 0 && <u> <h3 className='text-center'>Lab report(s) are </h3></u>}
                    {labs.length > 0 && (
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Test name </th>
                                    <th>Result</th>
                                    <th>Prepared by</th>
                                    {userType === 'doc' && <th>Update/delete</th>}
                                </tr>

                            </thead>
                            <tbody>
                                {labs.map((lab, index) => (
                                    <tr key={index}>
                                        <th> {index + 1}</th>
                                        <th>{lab.test_name}</th>

                                        {lab.result && <th> {lab.result} </th>}
                                        {!lab.result && <th ><small> (No result for now ) </small></th>}

                                        <th>{lab.name}</th>
                                        {userType === 'doc' &&
                                            <th>

                                                <div className='col-12 m-3'>
                                                    {/* update  */}

                                                    <ModalProvider>
                                                        <MainContent index={lab.app_id} lab={lab} setLab={setLab} report={report} act />
                                                        <ModalRoot />
                                                    </ModalProvider>
                                                </div>
                                            </th>
                                        }
                                    </tr>

                                ))}
                            </tbody>

                        </table>
                    )}
                    
                </div>

            </div>
        </div>
    )
}
