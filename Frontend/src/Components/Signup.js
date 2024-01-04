import React, { useState } from 'react';
import '../css/signup.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  let navigate=useNavigate();
  
  const [credentials, setCredentials]=useState({name:"", email:"", password:"", cpassword:""});

  const handleSubmit =async (e) => {
    e.preventDefault();
    const {name, email, password}=credentials;
    const response = await fetch(`http://localhost:5000/api/auth/CreateUser`, {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      } ,
      body: JSON.stringify({name, email, password})
    });
    const json = await response.json();
    console.log(json);
      localStorage.setItem('token', json.authToken);
      navigate("/");
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  return (
    <>
    <div className="SIGNUP">
      <div className="login-box">
        <h2>Register Here</h2>
        <form onSubmit={handleSubmit} >
          <div className="user-box">
            <input type="text" name="name" onChange={onChange} id='name' required=""/>
              <label>Name</label>
          </div>
          <div className="user-box">
            <input type="email" name="email" onChange={onChange} id='email' required=""/>
              <label>Email</label>
          </div>
          <div className="user-box">
            <input type="password" name="password" onChange={onChange} id='password' required=""/>
              <label>Password</label>
          </div>
          <div className="user-box">
            <input type="password" name="cpassword" onChange={onChange} id='cpassword' required=""/>
              <label>Confirm Password</label>
          </div>
          <button type="submit" className="signup-button">Register</button>
        </form>
      </div>
    </div>
    </>
  )
}

export default Signup
