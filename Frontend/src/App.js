import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Body from './Components/Body';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Search from './Components/Search';
import Random from './Components/Random';
import Profile from './Components/Profile';
import Feedback from './Components/Feedback';
import AddBlog from './Components/AddBlog';
import BlogState from './Contexts/Blog/BlogState';
import BlogDetail from './Components/BlogDetail';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Landingpage from './Components/Landingpage';

function App() {

  return (
    <>
      {localStorage.getItem('token') ? 
      <BlogState>
        <Router>
          {localStorage.getItem('token')?<Navbar />:""}
          <Body />
          <Routes>
            <Route exact path='/' element={<Home />}></Route>
            <Route exact path='/search' element={<Search />}></Route>
            <Route exact path='/random' element={<Random />}></Route>
            <Route exact path='/profile' element={<Profile />}></Route>
            <Route exact path='/feedback' element={<Feedback />}></Route>
            <Route exact path='/addblog' element={<AddBlog />}></Route>
            <Route exact path='/blogdetail' element={<BlogDetail />} ></Route>
          </Routes>
        </Router>
      </BlogState>
         : <BlogState>
           <Router>
             <Routes>
               <Route exact path='/' element={<Landingpage />}></Route>
               <Route exact path='/login' element={<Login />}></Route>
               <Route exact path='/signup' element={<Signup />}></Route>
             </Routes>
           </Router>
         </BlogState>
       }
      {/* <BlogState>
        <Router>
          {localStorage.getItem('token') ? <Body /> : ""}
          {localStorage.getItem('token') ? <Navbar /> : ""}
          <Routes>
            {!localStorage.getItem('token') ?
              <Route exact path='/' element={<Landingpage />}></Route>
              :
              <Route exact path='/' element={<Home />}></Route>
            }
            <Route exact path='/login' element={<Login />}></Route>
            <Route exact path='/signup' element={<Signup />}></Route>
            <Route exact path='/search' element={<Search />}></Route>
            <Route exact path='/random' element={<Random />}></Route>
            <Route exact path='/profile' element={<Profile />}></Route>
            <Route exact path='/feedback' element={<Feedback />}></Route>
            <Route exact path='/addblog' element={<AddBlog />}></Route>
            <Route exact path='/blogdetail' element={<BlogDetail />} ></Route>
          </Routes>

        </Router>
      </BlogState> */}
    </>
  );
}

export default App;