import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Groups.css';

function Groups() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [groups, setGroups] = useState<{ id: number; groupName: string }[]>([]);

  const username = localStorage.getItem("username");

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get('http://localhost:8080/allGroup', {
          params: {
            userId: userId
          }
        });

        const groupsData = response.data;
        setGroups(groupsData);
      } catch (error) {
        console.error('Hiba történt a kérés során:', error);
      }
    };

    fetchGroups();
  }, [userId]);
 
  const handleGroupButtonClick = (groupId: number) => {
    localStorage.setItem("groupId", String(groupId));
    navigate('/Group');
  };

  const handleProfileButtonClick = () => {
    navigate("/Profile");
  }

  const handleLogOutButtonClick = () =>{
    localStorage.clear();
    navigate("/")
  }



  return (
    <div className="list-container">
      <div className="App">
        <div className={`Dropdown ${isDropdownOpen ? 'Open' : ''}`}>
          <div className="DropdownButton" onClick={toggleDropdown}>
            {username}
          </div>
          <div className="DropdownContent">
            <button onClick={handleProfileButtonClick}>Profil</button>
            <button onClick={handleLogOutButtonClick}>Kilépés</button>
          </div>
        </div>
      </div>
      <Link to={'/newGroup'}>
        <button className='newGroup'>New Group</button>
      </Link>
      
      <div className="dynamic-height-container" style={{ height: Math.min(1000, groups.length * 50) + 'px', overflowY: 'auto' }}>
        <ul>
          {groups.map(group => (
            <li key={group.id}>
              <button onClick={() => handleGroupButtonClick(group.id)}>{group.groupName}</button>
            </li>
          ))}
        </ul>
      </div>      
    </div>
  );
}

export default Groups;
