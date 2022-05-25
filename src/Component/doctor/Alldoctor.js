import React, { Component, useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import {  useNavigate } from 'react-router-dom';
const axios = require('axios').default;

const AllDoctor = () => {
    const [doctors, setDotors] = useState([]);
    const [fetching, setFetching] = useState(true)
    const [q, setQ] = useState("");
    const [searchParam] = useState(["department", "name"]);
    const [error, setError] = useState();
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);

    const [urlid, setUrlId] = useState();
    const navigate = useNavigate();

    const handleProceed = (e) => {
        urlid && navigate("/doctorProfile/:id", { urlid })
        //history.push(generatePath("/doctorProfile/:id", { urlid }));

    };

    const fetchData = () => {

        let limit = 5;
        limit = limit + currentPage;
        fetch(`/doctor/? start = ${currentPage} &  end = ${limit}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setDotors(data)
                setFetching(false)
            })
    }

    const fetchRow = () => {
        axios.get(`/getRow/?doctors`)
            .then(function (response) {
                if (response.status == 200) {
                    //console.log("response", response.data);
                    setPageCount(response.data)
                } else {
                    setError("Cant load user data ");
                }
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                setFetching(false)
            });
    };
    const handlePageClick = (e) => {
        console.log(e.selected);
        setCurrentPage(e.selected);
        fetchData();
        console.log("current users are " + doctors)

    }
    useEffect(() => {
        fetchRow();
        const unsubscribe = fetchData();
        return unsubscribe;
    }, [fetching])

    if (fetching)
        return (
            <h1>Laoding..................</h1>
        )
    if (!fetching)
        return (
            <section className='bg-light' style={{ width: '90%', marginLeft: '5%' }}>

                <div className="">
                    <h1 className='fw-bold mb-0 text-center'><u>All Doctor</u></h1>
                </div>
                <div className="wrapper  m-4 " style={{ width: 'fit-content', height: '40px', float: 'rig' }}>
                    <div className="search-wrapper ">
                        <label htmlFor="search-form">
                            <div className="input-group ">
                                {/* <span className="input-group-text" >
                                    search
                                    <img src='/images/search.svg' className='m-3' />
                                </span> */}
                                <input type="search" className="form-control m-3" placeholder="Search Doctors" aria-label="Username" aria-describedby="basic-addon1"
                                    value={q}
                                    onChange={(e) => setQ(e.target.value)} />
                                {/* <div className="input-group-prepend p">
                                    <span className="sr-only input-group-text">Search By Doctor Name </span>
                                </div> */}
                            </div>

                        </label>
                    </div>
                </div>
                {doctors.length > 0 && (
                    <div className="row g-3 row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 row-cols-xl-4 row-cols-xxl-4 row-deck py-1 pb-4">
                        {
                            doctors.filter(doc => {
                                if (q === '') {
                                    return doc;
                                } else if (doc.name.toLowerCase().includes(q.toLowerCase())) {
                                    return doc;
                                }
                            })
                                .map(doctor => (
                                    <div className="col" key={doctor.id} >
                                        <div className='box'>
                                            <img src={doctor.image} alt='here is the dotor ' />

                                            <div className='content'>

                                                <h6 >{doctor.specialization}  </h6>
                                                <p>
                                                    Contact no: {doctor.contact} <br />
                                                    Email: {doctor.email}  <br />
                                                    NMC no : {doctor.nmc_no} <br />
                                                </p>
                                                <button className='btn btn-success' onClick={(e) =>  navigate(`/doctorProfile/: ${doctor.id}`)}>
                                                    View more
                                                </button>
                                            </div>
                                            <div className="teacher-info  w-100 text-center mt-3">
                                                <h5 className="mb-2 mt-2  fw-bold d-block fs-6"> {doctor.name}</h5>
                                                <strong>{doctor.specialization}</strong>
                                            </div>
                                        </div>
                                    </div>
                                ))
                        }
                    </div>
                )}

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
            </section>
        );

}
export default AllDoctor;