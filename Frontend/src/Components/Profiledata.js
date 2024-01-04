import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/Profiledata.css';
// import BlogContext from '../Contexts/Blog/BlogContext'

const Profile_user = (props) => {
  const {users}=props;
  let navigate=useNavigate();
  const pro=()=>{
    navigate("/addblog")
  } 
  return (
    <>
      <div className="user_data">
        <h2 className='user_name'>{users.name}</h2>
        <button className="btn btn-light">Edit Profile</button>
      </div>
      <div className="account_details">
        <div className="activity-box">
          <h4>Blogs</h4>
          <p>34</p>
        </div>
        <div className="activity-box">
          <h4>Following</h4>
          <p>45</p>
        </div>
        <div className="activity-box">
          <h4>Followers</h4>
          <p>12</p>
        </div>
        <button onClick={pro} className="btn btn-light blog-button">Add a Blog</button>
      </div>
      <hr className="horizontal-divider" />
    </>
  )
}

export default Profile_user
