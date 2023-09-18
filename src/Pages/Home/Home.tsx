import React, { useState } from 'react';
import './Home.css';

function Home() {
  const [username, setUsername] = useState('User123'); // Dinamikus felirat

  return (
    <div className="home-container">
      <h1 className="username">{username}</h1>
      <div className="button-container">
        <button className="my-groups-button">My Groups</button>
        <button className="new-group-button">New Group</button>
      </div>
    </div>
  );
}

export default Home;
