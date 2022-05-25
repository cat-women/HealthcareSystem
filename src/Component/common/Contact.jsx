import React, { Component } from 'react'
import { GoLocation } from "react-icons/go";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FiMail } from "react-icons/fi";

import '../../App.css';


class Contactus extends Component {
    render() {
        return (
            <section className='contact-container'  >

                <div className=''>

                    <div className='contact-box'>
                        <div className='contact-left'>
                            <form>
                                <h4 className='fw-bold mb-0 '>QUICK MESSAGE / FEEDBACK</h4>

                                <label><h7>Name:</h7> </label><input type="text" name="name" size="20" class=" form-control" placeholder="Name" required />
                                <label><h7>Phone:</h7></label> <input type="phone" name="phone" size="20" class=" form-control" placeholder="Phone" required />
                                <label><h7>Email:</h7></label> <input type="email" name="email" size="20" class=" form-control" placeholder="Email" required />
                                <h7>Message:</h7><textarea class="form-control" rows="4" placeholder="Message" required></textarea>

                                <input type="submit" value="Submit"></input>

                            </form>
                        </div>
                        <div className='contact-right'>
                            <h4 className='fw-bold mb-0'>ADDRESS</h4>
                            <div className='container'>
                                <div className='contactInfo'>
                                    <div className='box'>
                                        <div className="icon">

                                            <i className='GoLocation'></i>
                                            <GoLocation />
                                            <p>Kathmandu<br />

                                            </p>
                                        </div>
                                    </div>
                                    <div className='box'>
                                        <div className="icon">
                                            <i className='FiMail'></i>
                                            <FiMail />

                                            <p>info@grandehospital.com<br />



                                            </p>
                                        </div>
                                    </div>
                                    <div className='box'>
                                        <div className="icon"><i className='BsFillTelephoneFill'></i>
                                            <BsFillTelephoneFill />

                                            <p>+977-1-5159266,<br />
                                                +977-1-5159267,<br />
                                                +977-9801202550</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div style={{height:100}}>
                        <hr/>
                        <p className='text-center'>Copyright  &copy; Wecare 2022 </p>
                        <p className='text-center' > <i>A UNION OF COMPASSION &#38; HEALTHCARE  </i></p>
                    </div>
                </div>
            </section>
        );

    }

}

export default Contactus;