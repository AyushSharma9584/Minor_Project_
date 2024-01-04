import React from 'react'
import '../css/Navbar.css'
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  let navigate=useNavigate();
  //Use location hook is to be added
  // let location = useLocation();
  // useEffect(() => {
  //   console.log(location.pathname);
  // }, [location]); 
  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate("/login");
  }

  return (
    <>
      <div className="top-navigation">
        <ul>
          <li className="top-list-items logo">360 Views Logo</li>
          <li className="top-list-items name"><h1>360 Views</h1></li>
          <Link to="/feedback"><li className={`top-list-items feedback`} >Feedback</li></Link>

          <Link to="/about"><li className={`top-list-items about`}>About</li></Link>

          <Link to="/addblog"><li className={`top-list-items navigation-add-blog`}><i className="fa-regular fa-square-plus"></i></li></Link>

        </ul>
      </div>
      <div className="left-navigation">
        <ul>
          <Link to="/"><li className={`left-list-items`}><i className="fa-solid fa-house">&nbsp;</i>Home</li></Link>

          {/* <Link to="/search"><li className={`left-list-items`}><i className="fa-solid fa-magnifying-glass"></i>&nbsp;Search</li></Link> */}

          <Link to='/random' ><li className={`left-list-items`}><i className="fa-solid fa-shuffle"></i>&nbsp;Random</li></Link>

          <Link to="/profile" ><li className={`left-list-items`}><i className="fa-solid fa-user"></i>&nbsp;Profile</li></Link>

          <hr className='leftnavigation-line' />
          <button className=' btn  btn-light logout_button' onClick={handleLogout}>Log Out</button>
        </ul>
      </div>
    </>

  )
}

export default Navbar
