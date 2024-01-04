import React, { useState } from 'react';
import '../css/login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  let navigate=useNavigate();

  const [credentials, setCredentials]=useState({email:"", password:""});

  const handleSubmit =async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      } ,
      body: JSON.stringify({email:credentials.email, password:credentials.password})
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
      localStorage.setItem('token', json.authToken);
      navigate("/");
    }
    else{
      console.log("Invalid Credentials")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }


  return (
    <>
    <div className="login">
      <div className="login-box">
        <h2>Login Here</h2>
        <form  onSubmit={handleSubmit}>
          <div className="user-box">
            <input type="email" name="email" value={credentials.email} id='email' onChange={onChange} required="" />
            <label>Email</label>
          </div>
          <div className="user-box">
            <input type="password" name="password" value={credentials.password} id='password'onChange={onChange} required="" />
            <label>Password</label>
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
    </>
  )
}

export default Login
