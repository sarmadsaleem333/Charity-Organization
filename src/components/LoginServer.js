import React, { useContext, useState } from 'react'
import alertContext from '../context/alertContext/AlertContext';
import serverAuthContext from '../context/serverContext/serverAuthContext';
import { useNavigate } from 'react-router-dom';


export default function LoginServer() {
    const navigate = useNavigate();
    const context = useContext(serverAuthContext);
    const { loginServer } = context;
    const alertcontext = useContext(alertContext);
    const { showAlert } = alertcontext;
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    const handleSubmit = async () => {
        const response = await loginServer(credentials.email, credentials.password);

        if (credentials.email.length <= 0 || credentials.password.length < 0) {
            return showAlert("Please enter email and password", "danger");
        }
        if (response.success) {
            showAlert("You have logged in successfully!", "success");
            localStorage.setItem("token", response.authtoken);
            global.user=false;  
            
            navigate("/applications_server");
        }
        else
            showAlert(response.error, "danger");
    }

    return (
        <div className='d-flex flex-column justify-content-center my-3'>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" class="form-control" name='email' id="exampleInputEmail1" value={credentials.email} baaria-describedby="emailHelp" onChange={onChange} />
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" name='password' value={credentials.password} class="form-control" id="exampleInputPassword1" onChange={onChange} />
            </div>
            <div className='align-self-center '>
                <button class="btn btn-success " onClick={handleSubmit}>Login </button>
            </div>
        </div>
    )
}