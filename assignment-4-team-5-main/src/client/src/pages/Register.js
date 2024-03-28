import React, { useState } from 'react'
import Axios from "axios";
import { useNavigate } from 'react-router-dom';

function Register() {

    const navigate = useNavigate();

    const [usernameReg, setUsernameReg] = useState("");
    const [fnameReg, setFnameReg] = useState("");
    const [lnameReg, setLnameReg] = useState("");
    const [emailReg, setEmailReg] = useState("");
    const [dateOfBirthReg, setDateOfBirthReg] = useState("");
    const [genderReg, setGenderReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");

    //to make the date for the current day
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    const register = () => {
        Axios.post("http://localhost:4200/register", {
            username: usernameReg,
            fname: fnameReg,
            lname: lnameReg,
            email: emailReg,
            dateOB: dateOfBirthReg,
            gender: genderReg,
            creationDate: today,
            password: passwordReg,
        }).then((response) => {
            console.log(response);
            console.log(response.status)

            if (response.status == 200) {
                alert("Registration Success!")
                navigate("/login", { replace: true })
            }
        });
    };

    return (
        <div>
            <div>
                <h1> Register</h1>
                <label>Username: </label>
                <input type="text" onChange={(e) => {
                    setUsernameReg(e.target.value);
                }}
                /><br />
                <label>Password: </label>
                <input type="password" onChange={(e) => {
                    setPasswordReg(e.target.value);
                }} /><br />
                <label>First Name: </label>
                <input type="text" onChange={(e) => {
                    setFnameReg(e.target.value);
                }} /><br />
                <label>Last Name: </label>
                <input type="text" onChange={(e) => {
                    setLnameReg(e.target.value);
                }} /><br />
                <label>Email: </label>
                <input type="email" onChange={(e) => {
                    setEmailReg(e.target.value);
                }} /><br />
                <label>Date of Birth: </label>
                <input type="text" onChange={(e) => {
                    setDateOfBirthReg(e.target.value);
                }} /><br />
                <label>Gender: </label>
                <input type="text" onChange={(e) => {
                    setGenderReg(e.target.value);
                }} />
                <button id="register" onClick={register}> Register </button>
            </div>
        </div>
    )
}

export default Register;