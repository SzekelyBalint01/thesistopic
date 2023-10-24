import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'; 

import Home from './Pages/Home/Home';
import NewItem from './Pages/NewItem/NewItem'
import Login from './Pages/Login/Login'
import Registration from './Pages/Registration/Registration';
import NewGroup from './Pages/NewGroup/NewGroup'
import MyGroups from './Pages/MyGroups/MyGroups'
import Group from './Pages/Group/Group'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Registration" element={<Registration />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/newitem" element={<NewItem />} />
          <Route path="/newGroup" element={<NewGroup />} />
          <Route path="/myGroups" element={<MyGroups />} />
          <Route path="/Group" element={<Group />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
