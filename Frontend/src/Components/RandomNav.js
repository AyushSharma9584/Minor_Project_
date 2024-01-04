import React from 'react';
import '../css/Random.css'
import {Link} from "react-router-dom";

const RandomNav = () => {
  return (
    <>
      <div className="random ">
        <li className="random-list-items"><Link className='random-links' to="/random/">General</Link></li>
        <li className="random-list-items"><Link className='random-links' to="/random/science">Science</Link></li>
        <li className="random-list-items"><Link className='random-links' to="/random/politics">Politics</Link></li>
        <li className="random-list-items"><Link className='random-links' to="/random/entertainment">Entertainment</Link></li>
        <li className="random-list-items"><Link className='random-links' to="/random/nature">Nature</Link></li>
        <li className="random-list-items"><Link className='random-links' to="/random/happy">Happy</Link></li>
        <li className="random-list-items"><Link className='random-links' to="/random/sad">Sad</Link></li>
        <li className="random-list-items"><Link className='random-links' to="/random/sports">Sports</Link></li>
        <hr className='random-line' />
      </div>
    </>
  )
}

export default RandomNav
