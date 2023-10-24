import React, { useState } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

function Home() {
  const [username, setUsername] = useState(localStorage.getItem("username")); 

  return (
    <div className="home-container">
      <h1 className="username">Hello {username} !</h1>
      <div className="button-container">
        <Link to="/myGroups">
          <button className="my-groups-button">My Groups</button>
        </Link>
        <Link to="/newGroup">
        <button className="new-group-button">New Group</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
