import { Link } from "react-router-dom";
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import Axios from "axios";


function Home() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [loginStatus, setLoginStatus] = useState(false);

    //Axios.defaults.withCredentials = true;

    const login = () => {
        Axios.post("http://localhost:4200/login", {
            username: username,
            password: loginPassword,
        }).then((response) => {
            //console.log(response);
            console.log(response.data)

            if (!response.data.auth) {
                setLoginStatus(false)
                alert("Login failed! Please try again")
            } else {
                console.log(response.data.result)
                // localStorage.setItem('token', response.data.user)
                // setLoginStatus(true)
                // const user = jwt_decode(response.data.user);

                alert("Login Sucess! Welcome " + response.data.result[0].username)
                sessionStorage.setItem('currentloggedin', response.data.result[0].username)

                navigate("/dashboard", { replace: true })
            }
        });

    }


    return (
        <div>
            <h1>Welcome to PictureThis!</h1>
            <h4>Please Login or Register to Start</h4>

            <div id="buttons">
            </div>
            <h1> Login</h1>
            <label>Username: </label>
            <input
                type="text"
                placeholder='Username'
                onChange={(e) => { setUsername(e.target.value) }}
            />
            <br />
            <label>Password: </label>
            <input
                type="password"
                placeholder='password'
                onChange={(e) => { setLoginPassword(e.target.value) }}
            />
            <button id="login" onClick={login}>Login</button>
            <br></br>
            <a href="/register" id="register-link">Don't have an account?</a>
            {/* {loginStatus && <button onClick={userAuth}> Check if authenticated</button>} */}
        </div>
    )
}

export default Home;