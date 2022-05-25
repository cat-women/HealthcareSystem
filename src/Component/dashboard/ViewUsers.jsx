
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
const axios = require('axios').default;

export default function ViewUsers() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  function fetchUser() {
    setLoading(true)
    let limit = 5;
    limit = limit + currentPage;
    axios.get(`/user/? start = ${currentPage} &  end = ${limit}`)
      .then(function (response) {
        if (response.status == 200) {
          //console.log("response", response.data);
          setUsers(response.data)
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
    console.log("current users are " + users)

  }
  const fetchRow = () => {
    axios.get(`/getRow/?users`)
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
        setLoading(false)
      });
  };
  useEffect(() => {
    fetchRow();
    fetchUser();
  }, [])

  return (
    <div>

      {users.length > 0 &&
        <div className='col m-3'>
          <label className='blockquote fs-3 fw-bold text-center' style={{color:'white',zIndex:-99}}>List of users </label>
          <ol class="list-group list-group-numbered">
            {users.map(user => (
              <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                  <div class="fw-bold">{user.name}</div>
                  {user.email}
                </div>
                <span class="badge bg-primary rounded-pill m-3">
                  <button >Details</button>
                </span>
              </li>
            ))}
          </ol>
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
