import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'; 

import Home from './Pages/Group/Group';
import NewItem from './Pages/NewItem/NewItem'
import Login from './Pages/Login/Login'
import Registration from './Pages/Registration/Registration';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Registration" element={<Registration />} />
          <Route path="/group" element={<Home />} />
          <Route path="/newitem" element={<NewItem />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
