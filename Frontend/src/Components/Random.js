import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import RandomNav from './RandomNav';
import RandomCat from './RandomCat';

const Random = () => {
  return (
    <>
      <Router>
        <RandomNav/>
        <Routes>
            <Route exact path='/random/' element={ <RandomCat/> }></Route>
            <Route exact path='/random/science' element={<RandomCat/>}></Route>
            <Route exact path='/random/politics' element={<RandomCat/>}></Route>
            <Route exact path='/random/entertainment' element={<RandomCat/>}></Route>
            {/* <Route exact path='/random/nature' element={<Feedback />}></Route>
            <Route exact path='/random/happy' element={<AddBlog />}></Route>
            <Route exact path='/random/sad' element={<BlogDetail />} ></Route>
            <Route exact path='/random/sports' element={<BlogDetail />} ></Route> */}
        </Routes>
      </Router>
    </>
  )
}

export default Random