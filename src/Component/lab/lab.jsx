import React, { useState } from 'react'

export default function lab() {
    const [formData,setFormData] = useState({
        patience_id:"",
        name:"",
        doctor_id:"",
        diagnosis:"",
        syptopms:"",
        date:""
    })
    return (
        <section>
            <div class="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                <h2 className='fw-bold mb-0 text-center'>Create new lab report </h2>
            </div>
            <form>
                <div className='form-inner'>
                    <div className="row m-3">
                        <div className="col m-3">
                            <label htmlFor='Name'>Patience  Name</label>
                            <input type="text" class="form-control" placeholder="First name" aria-label="First name"
                                name='name' />
                        </div>
                        <div className="col m-3">
                            <label htmlFor='Last name'>Patience ID</label>
                            <input type="text" class="form-control" placeholder="Last Name" aria-label="Last Name"
                                name='id' />
                        </div>
                        <div className="row m-3">
                            <div className="col">
                                <label htmlFor='Email address'>Symptopms</label>
                                <textarea type="textarea" class="form-control" placeholder="Email Address" aria-label="Email Address"
                                    name='symptopms' ></textarea>
                            </div>
                        </div>
                        <div className="row m-3">
                            <div className="col">
                                <label htmlFor='phone number'>Daignosis</label>
                                <textarea type="textarea" class="form-control" placeholder="Phone Number" aria-label="Phone number"
                                    name='diagnosis' ></textarea>
                            </div>
                        </div>
                        <div className="row m-3">
                            <div className="col">
                                <label for="admitdate" class="form-label">Date  </label>
                                <input type="date" class="form-control" id="admitdate" required />

                            </div>
                        </div>
                        <input type="submit" value="Submit" ></input>


                    </div>
                </div>
            </form>
        </section >




    )
}
