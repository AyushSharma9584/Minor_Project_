import React, {useContext} from 'react';
import BlogContext from '../Contexts/Blog/BlogContext';
import '../css/BlogItem.css';
import { Link } from 'react-router-dom';

// import BlogDetail from './BlogDetail';
const BlogItems = (props) => {
    // let flag=false;
    
  const context = useContext(BlogContext);
  const {deleteblog} = context;
    const { blog, updateblog } = props;
    // const pro=()=>{
    //     console.log(blog.title);
    //     flag=true;
    //     console.log(flag);
    // }
    return ( 
        <div>
            <div className="card my-3 ">
                <div className="card-body bg-dark blog-box">
                    <h5 className="card-title">{blog.title}</h5>
                    <button className='btn btn-light mx-2 delete-icon' onClick={()=>{deleteblog(blog._id)}}>Delete <i className="fa-solid fa-trash"></i></button>
                    <button className='btn btn-light mx-2 update-icon' onClick={()=>{
                        updateblog(blog)
                    }}>Update <i className="fa-sharp fa-regular fa-pen-to-square"></i></button>
                   {/* <p className='delete-icon'>Delete <i className="fa-solid fa-trash"></i> </p> 
                    <p className='update-icon'>Update  <i className="fa-sharp fa-regular fa-pen-to-square"></i></p> */}
                    <p className="card-text">{blog.description.substring(0,270)}...</p>
                    {/* <button className="btn btn-light" onClick={pro}>Read Full</button>
                    {flag ? <BlogDetail blog={blog}/>: ""} */}
                    <Link to="/BlogDetail" state={{blog:blog}} >Read Full</Link>
                </div>
            </div>
        </div>
    )
}

export default BlogItems