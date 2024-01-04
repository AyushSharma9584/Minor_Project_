import React,{useState} from 'react'
import BlogContext from './BlogContext'

const BlogState = (props) => {
  const host="http://localhost:5000";
    const blogstart=[];
    const [blogs,setBlogs]=useState(blogstart);
    const [users,setUsers]=useState("");
    let User;

    //Get all notes of user
    const getblog=async (title,description,category)=>{
      //API Call
      const response = await fetch(`${host}/api/blogs/fetchuserblogs`, {
        method: "GET",
        headers: {
            'Content-Type': "application/json",
            // 'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmYjBjMWIyY2M2NzdlYWRlMmU2OWJhIn0sImlhdCI6MTY3ODg2NjM0MH0.Dj530NOvPpHfgvb_qfBVJMuSiZ_PkDfu1e2qU-K-QzE"
            'auth-token':localStorage.getItem('token')
        }
    });
    const json=await response.json();
    setBlogs(json)
    }

    //Add a blog
    const addblog=async (title,description,category)=>{
      console.log("Adding a Blog");
       // API call
       const response = await fetch(`${host}/api/blogs/addblog`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
            // 'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmYjBjMWIyY2M2NzdlYWRlMmU2OWJhIn0sImlhdCI6MTY3ODg2NjM0MH0.Dj530NOvPpHfgvb_qfBVJMuSiZ_PkDfu1e2qU-K-QzE"
            'auth-token':localStorage.getItem('token')


        },
        body: JSON.stringify({ title, description, category })
    });
    const blog = await response.json();
      setBlogs(blogs.concat(blog));
    }

    //Delete a Blog
    const deleteblog=async (id)=>{
      //API call
      const response = await fetch(`${host}/api/blogs/deleteblog/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': "application/json",
            // 'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmYjBjMWIyY2M2NzdlYWRlMmU2OWJhIn0sImlhdCI6MTY3ODg2NjM0MH0.Dj530NOvPpHfgvb_qfBVJMuSiZ_PkDfu1e2qU-K-QzE"
            'auth-token':localStorage.getItem('token')

        }
      });
    const json = response.json();
    console.log(json);
      const newBlogs=blogs.filter((blog)=>{return blog._id!==id})
      setBlogs(newBlogs);
    }

    //Edit an blog
    const editblog=async (id, title, description,category)=>{
      //API Call
      const response = await fetch(`${host}/api/blogs/updateblog/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': "application/json",
            // 'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmYjBjMWIyY2M2NzdlYWRlMmU2OWJhIn0sImlhdCI6MTY3ODg2NjM0MH0.Dj530NOvPpHfgvb_qfBVJMuSiZ_PkDfu1e2qU-K-QzE"
            'auth-token':localStorage.getItem('token')

        },
        body: JSON.stringify({ title, description, category })
    }
    );
    const json = await response.json();
    //Editing a note
    let newBlogs = await JSON.parse(JSON.stringify(blogs));
    for (let index = 0; index < newBlogs.length; index++) {
        const element = newBlogs[index];
        if (element._id === id) {
            newBlogs[index].title = title;
            newBlogs[index].description = description;
            newBlogs[index].category = category;
            break;
        }
    }
    setBlogs(newBlogs);
    }

    const User_details=async()=>{
      //API Call
      const response = await fetch(`${host}/api/auth/getUser`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
            // 'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmYjBjMWIyY2M2NzdlYWRlMmU2OWJhIn0sImlhdCI6MTY3ODg2NjM0MH0.Dj530NOvPpHfgvb_qfBVJMuSiZ_PkDfu1e2qU-K-QzE"
            'auth-token': localStorage.getItem('token')
        }
      });
      const json=await response.json();
      setUsers(json);
    }


  return (
    <BlogContext.Provider value={{blogs,getblog, setBlogs, addblog, deleteblog, editblog, User_details, users}}>
        {props.children}
    </BlogContext.Provider>
  )
}

export default BlogState
