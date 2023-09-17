import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'; 

import Home from './Pages/Group/Group';
import NewItem from './Pages/NewItem/NewItem'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/group" element={<Home />} />
          <Route path="/newitem" element={<NewItem />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
