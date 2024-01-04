import React from 'react'
import '../css/BlogDetail.css'
import { useLocation } from 'react-router-dom';

const BlogDetail = () => {
  let location = useLocation();
  const { blog } = location.state;
  return (
    <div className='blog-detail'>
      <div className="details">
        <h3>{blog.title} </h3>
        <p>{blog.description}</p>
        <button className="detail-button mx-3"> Like</button>
        <button className="detail-button mx-3"> Comment</button>
        <button className="detail-button mx-3"> Follow</button>
      </div>
    </div>
  )
}

export default BlogDetail
