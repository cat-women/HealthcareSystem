import React, { Component } from 'react'
import { AiFillPlusCircle } from "react-icons/ai";


class Doctorschedule extends Component {
    render() {
        return (
            <section>
                <div class="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                        
            
                      
                <h1>Doctor Schedule</h1>

                <button type="button"  className="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    <i className='AiFillPlusCircle me-2 fs-6'>
                    <AiFillPlusCircle/>
                    </i>
                    Add Schedule
                </button>
                </div>
                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="col-auto d-flex w-sm-100">Schedule Add</h5>
                                <button type="button >" className="btn-close" data-bs-dismiss="modal" aria-label="Done">

                                </button>
                            </div>

                            <div className="modal-body">

                                <form>
                                    <div className="row">
                                        <div className='col'>
                                            <label for="exampleInputEmail1" >Schedule Date</label>
                                            <input type="text" class="form-control" id="" aria-describedby="emailHelp" />
                                        </div>
                                        <div className='col'>
                                            <label for="deptwo" class="form-label">Schedule Time  </label>
                                            <input type="time" class="form-control" id="deptwo" required />


                                        </div>
                                        <div className='row'>
                                            <div className='col'>

                                                <label for="Textarea" class="form-label">Add Note</label>
                                                <textarea class="form-control" id="Textarea" rows="3"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Done</button>
                                <button type="button" className="btn btn-primary">Add</button>
                            </div>
                        </div>
                    </div>
                </div>



            </section>




        );

    }

}
export default Doctorschedule;