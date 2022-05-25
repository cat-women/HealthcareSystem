import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { ModalContext, ModalProvider, ModalRoot } from 'react-multi-modal';
import MainContent from '../user/UserModalManger';
const axios = require('axios').default;

export default function AllAppointment() {
    const [data, setData] = useState([])
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [report,setReport] = useState();
    const [lab,setLab] = useState();
    
    function fetchUser() {
        setLoading(true)
        // console.log("urrent page is " + currentPage)
        let limit = 5;
        limit = limit + currentPage;
        axios.get(`/eachAppointment/? start = ${currentPage} &  end = ${limit}`)
            .then(function (response) {
                if (response.status == 200) {
                    console.log("response of all data ", response.data);
                    setData(response.data)
                } else {
                    setError("Cant load user data ");
                }
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                setLoading(false)
            });
    }

    const handlePageClick = (e) => {
        console.log(e.selected);
        setCurrentPage(e.selected);
        fetchUser();
        console.log("current users are " + data)

    }
    const fetchRow = () => {
        axios.get(`/getRow/?appointments`)
            .then(function (response) {
                if (response.status == 200) {
                    console.log("response of get row", response.data);
                    setPageCount(response.data)
                } else {
                    setError("Cant load user data ");
                }
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                setLoading(false)
            });
    };
    useEffect(() => {
        fetchRow();
        fetchUser();
    }, [])

    return (
        <div>

            {data.length > 0 &&
                <div className='col m-3 bg-light'>
                    <h1 className='text-center fs-3 fw-bold'>All appointment </h1><hr />
                    <table className='table '>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Patinet name</th>
                                <th>Patinet Contact</th>
                                <th>Department</th>
                                <th>Appointment date</th>
                                <th>Appointed to </th>
                                <th>Status</th>
                                <th>Update/Delete</th>

                            </tr>
                        </thead>
                        <tbody>

                            {data.map((user, index) => (
                                <tr>
                                    <th>{index + 1}</th>
                                    <th>{user.name}</th>
                                    <th>Email: {user.email} <br /> Contact: {user.contact}</th>
                                    <th>{user.department}</th>
                                    <th>{user.date}</th>
                                    <th>{user.doctor_name}</th>
                                    <th> {(user.isChecked == 0) ? "Not checked" : "Checked"}</th>
                                    <th>
                                        <button type='btn ' >Delete </button> ||
                                        <button type='btn ' >Update </button> 
                                        
                                    </th>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            }
            <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
            />
        </div>
    )
}


