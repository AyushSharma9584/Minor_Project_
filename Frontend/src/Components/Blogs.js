import React, { useContext, useState, useEffect, useRef } from 'react'
import BlogContext from '../Contexts/Blog/BlogContext'
import BlogItems from './BlogItems';

const Blogs = () => {
  const context = useContext(BlogContext);
  const { blogs, getblog, editblog } = context;
  const [blog, setBlog] = useState({ id: "", e_title: "", e_description: "", e_category: "default" });
  useEffect(() => {
    getblog();
    // eslint-disable-next-line
  }, [])

  const updateblog = (currentNote) => {
    ref.current.click();
    setBlog({
      id: currentNote._id,
      e_title: currentNote.title,
      e_description: currentNote.description,
      e_category: currentNote.category
    });
    // setNote(CurrentNote);
  }

  const ref = useRef(null);
  const refClose = useRef(null);

  const handleClick = () => {
    editblog(blog.id, blog.e_title, blog.e_description, blog.e_category)
    refClose.current.click();
    // props.showAlert("Updated successfully", "success");
  }

  const onChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  }


  return (
    <div>
      <button type="button" ref={ref} className=" d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade modal-dark " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Blog</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="e_title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="e_title" value={blog.e_title} name="e_title" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="e_description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="e_description" value={blog.e_description} name='e_description' onChange={onChange} minLength={20} required />
                </div>
                {/* <div className="mb-3">
                  <label htmlFor="e_tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="e_tag" value={note.e_tag} name='e_tag' onChange={onChange} />
                </div> */}
                <div className="mb-3">
                  <label className='mb-2' htmlFor="e_category">Type of blog</label>
                  <select className="form-select " value={blog.e_category} aria-label="Default select example" name='e_category' id='e_category' onChange={onChange}>
                    <option defaultValue>General</option>
                    <option value="1">Happy</option>
                    <option value="2">Sad</option>
                    <option value="3">Nature</option>
                    <option value="4">Science</option>
                    <option value="5">Politics</option>
                    <option value="6">Entertainment</option>
                    <option value="7">Sports</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={blog.e_title.title < 5 || blog.e_description.length < 5} type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <h2>Blogs</h2>
      {blogs.map((blog) => {
        return <BlogItems key={blog._id} updateblog={updateblog} blog={blog} />;
      })}
    </div>
  )
}

export default Blogs