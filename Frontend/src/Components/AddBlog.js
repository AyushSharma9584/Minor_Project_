import React, { useContext, useState } from 'react';
import BlogContext from '../Contexts/Blog/BlogContext';
import '../css/AddBlog.css';
import { useNavigate } from 'react-router-dom';

const AddBlog = () => {
  let navigate=useNavigate();

  const context = useContext(BlogContext);
  const {addblog} = context;
  const [blog, setBlog] = useState({ title: "", description: "", category: "" });

  const handleClick = (e) => {
    e.preventDefault();
    addblog(blog.title, blog.description, blog.category);
    setBlog({title:"", description:"", category:"general"});
    navigate("/profile");
  }

  const onChange=(e)=>{
    setBlog({...blog, [e.target.name]:e.target.value});
  }

  return (
    <>
      <div className="add-blog">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" value={blog.title} className="form-control " id="title" name='title' minLength={5} placeholder="Ex:- Current Issues" onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea className="form-control " name='description' value={blog.description} onChange={onChange} rows="3" required minLength={20} ></textarea>
        </div>
        <div className="mb-3">
          <label className='mb-2' htmlFor="category">Type of blog</label>
          <select className="form-select " aria-label="Default select example" name='category' id='category' value={blog.category} onChange={onChange}>
            <option value="General" defaultValue>General</option>
            <option value="Happy">Happy</option>
            <option value="Sad">Sad</option>
            <option value="Nature">Nature</option>
            <option value="Science">Science</option>
            <option value="Politics">Politics</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Sports">Sports</option>
          </select>
        </div>
        <div className="mb-3">
          <button disabled={blog.title.title<5 || blog.description.length<20} className="btn btn-light" onClick={handleClick}>Post It!!</button>
        </div>
      </div>
    </>
  )
}

export default AddBlog
