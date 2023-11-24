import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import NewItem from './Pages/NewItem/NewItem';
import Login from './Pages/Login/Login';
import Registration from './Pages/Registration/Registration';
import NewGroup from './Pages/NewGroup/NewGroup';
import Groups from './Pages/Groups/Groups';
import Item from './Pages/Item/Item';
import Group from './Pages/Group/Group';
import Profile from './Pages/Profile/Profile';
import './App.css'

function App() {


  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Registration" element={<Registration />} />
          <Route path="/newitem" element={<NewItem />} />
          <Route path="/newGroup" element={<NewGroup />} />
          <Route path="/Groups" element={<Groups />} />
          <Route path="/Item" element={<Item />} />
          <Route path="/Group" element={<Group />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
    </Router>
  );
}

export default App;
