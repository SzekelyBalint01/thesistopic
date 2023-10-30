import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import NewItem from './Pages/NewItem/NewItem';
import Login from './Pages/Login/Login';
import Registration from './Pages/Registration/Registration';
import NewGroup from './Pages/NewGroup/NewGroup';
import Groups from './Pages/Groups/Groups';
import Item from './Pages/Item/Item';
import Group from './Pages/Group/Group';
import './App.css'

function App() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <Router>
      <div className="App">
        <div className={`Dropdown ${isDropdownOpen ? 'Open' : ''}`}>
          <div className="DropdownButton" onClick={toggleDropdown}>
            Username
          </div>
          <div className="DropdownContent">
            <Link to="/profile">Profil</Link>
            <Link to="/logout">Kilépés</Link>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Registration" element={<Registration />} />
          <Route path="/newitem" element={<NewItem />} />
          <Route path="/newGroup" element={<NewGroup />} />
          <Route path="/Groups" element={<Groups />} />
          <Route path="/Item" element={<Item />} />
          <Route path="/Group" element={<Group />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
