import React from 'react'
import { Link } from 'react-router-dom'
import '../css/landingpage.css'

const Landingpage = () => {
  return (
    <div>
      <div className="heading">
        <h1 className="big-heading">360 Views</h1>
        <img className="image" src='./images/laptop.jpg' alt="laptop pic" />
        <div className="description  ">
          <p className="para">Welcome to <strong>360 Views</strong>, here we are welcoming you to the world of blogs where you will find some amazing, wonderful and knowledgeable blogs about so many topics which will change the way you think</p>
          <Link to={'/login'}><button className="btn btn-primary btn-lg">Login</button></Link>
          <Link to={'/signup'}><button className="btn btn-primary btn-lg mx-2">Signup</button></Link>
        </div>
      </div>

    </div>
  )
}

export default Landingpage