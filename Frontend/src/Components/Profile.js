import React, { useContext, useEffect } from 'react'
import '../css/Profile.css'
import Blogs from './Blogs'
import Profiledata from './Profiledata'
import BlogContext from '../Contexts/Blog/BlogContext'


const Profile = () => {
  const context = useContext(BlogContext);
  const { User_details, users} = context;
 
  useEffect(()=>{
    User_details();
    // eslint-disable-next-line
  },[])
  return (
    <>
    <div className="user-profile">
      <Profiledata users={users}/>
      <Blogs/>
    </div>
    </>
  )
}

export default Profile
