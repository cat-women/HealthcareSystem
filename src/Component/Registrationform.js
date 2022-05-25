import React, { useState } from 'react'
const axios = require('axios').default;
export default function Registrationform() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        username: "",
        password: "",

    });
    const [repwd, setrepwd] = useState("");
    const [error,setError] = useState("");
    const handleChange = async (e) => {
        e.preventDefault();
        console.log(repwd);
        console.log(formData);
        if (formData.name == "" && formData.email == "" && formData.username == "" && formData.password == "") {
            setError("Cant submit empty form ")
            return false;
        }
        if (formData.name == "") {
            document.getElementById("nameerror").innerHTML = "Please enter name "
            return false
        }

        if (formData.email == "") {
            document.getElementById("emailerror").innerHTML = "Please enter email "
            return false
        }


        if (formData.username == "") {
            document.getElementById("usernameerror").innerHTML = "Please enter username "
            return false
        }

        if (!isNaN(formData.username)) {
            document.getElementById("usernameerror").innerHTML = "username cant be  number "
            return false
        }

        if (formData.password == "") {
            document.getElementById("pwderror").innerHTML = "Please enter password "
            return false
        }


        if (repwd != formData.password) {
            document.getElementById("repwderror").innerHTML = "Password did not matched "
            return false
        }


        const requestJson = JSON.stringify(formData);
        try {
            const response = await fetch("/user", {
                method: "POST",
                body: requestJson,
            });
            const responseText = await response.text();
            setError("")
            //console.log(responseText);
        } catch (ex) {
            console.error("POST error!");
        }
    }


    return (
        <form onSubmit={handleChange} method="POST" style={{width:'90%'}} className='d-flex justify-content-center' >
            <div className='form-inner'>
                <h2 className='text-center '>Registration form </h2> 
                <hr/>
                <div className='form-group'>
                    <label htmlFor='Name'>Full Name:</label>
                    <input type="name" name='name' id="name"
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        value={formData.name} />
                    <div id="error" class="form-text">
                        <span id='nameerror' style={{ color: "red" }}>{error}</span>
                    </div>

                </div>
                <div className='form-group'>
                    <label htmlFor='Email'>Email:</label>
                    <input type="email" name='email' id="email"
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        value={formData.email} />
                    <div id="error" class="form-text">
                        <span id='emailerror' style={{ color: "red" }}></span>
                    </div>

                </div>
                <div className='form-group'>
                    <label htmlFor='Email'>User Name:</label>
                    <input type="text" name='username' id="username"
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        value={formData.username} />
                    <div id="error" class="form-text">
                        <span id='usernameerror' style={{ color: "red" }}></span>
                    </div>

                </div>
                <div className='form-group'>
                    <label htmlFor='Password'>Password:</label>
                    <input type="password" name='password' id="password"
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        value={formData.password} />
                    <div id="error" class="form-text">
                        <span id='pwderror' style={{ color: "red" }}></span>
                    </div>


                </div>
                <div className='form-group'>
                    <label htmlFor='password '>Confirm password:</label>
                    <input type="password " name='confirm '
                        id="confirm "
                        value={repwd}
                        onChange={(e) => setrepwd(e.target.value)}
                    />

                    <div id="error" class="form-text">
                        <span id='repwderror' style={{ color: "red" }}></span>
                    </div>

                </div>
                <input type="submit" value="Register"></input>
            </div>
        </form>
    )
}

