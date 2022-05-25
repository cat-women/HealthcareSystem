import { Button } from 'bootstrap';
import React, { useState } from 'react'

export default function About() {


    const [formData, setFormData] = useState({
        name: "test",
        email: "teat@gmail.com  ",
        username: "123",
        password: "123",

    });
    const handleChange = (e) => {
        e.preventDefault();
        alert("hello")
        console.log("this is handle change ");

        console.log(formData)
    }
    return (
        < >
            <div className=''>
                <div className='row' >
                    <div className='col bg-light m-3'>
                        <form onSubmit={handleChange} method="POST" >
                            <div className='form-inner'>
                                <h2>Registration form</h2>
                                <div className='form-group'>
                                    <label htmlFor='Name'>Full Name:</label>
                                    <input type="name" name='name' id="name"
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        value={formData.name} />

                                </div>
                                <div className='form-group'>
                                    <label htmlFor='Email'>Email:</label>
                                    <input type="email" name='email' id="email"
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        value={formData.email} />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='Email'>User Name:</label>
                                    <input type="text" name='username' id="username"
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                        value={formData.username} />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='Password'>Password:</label>

                                    <input type="password" name='password' id="password"
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        value={formData.password} />

                                </div>
                                <div className='form-group'>
                                    <label htmlFor='confirm '>Confirm password:</label>
                                    <input type="confirm " name='confirm ' id="confirm " />
                                </div>
                                <input type="submit" value="Register"></input>
                            </div>
                        </form>
                    </div>
                    <div className='col bg-primary m-3'>
                        <h2>Address</h2>
                    </div>

                </div>
                <button
                    value="submit"
                    className="btn btn-primary"
                    onClick={handleChange}
                />

            </div>


        </>
    )
}
