import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Groups.css';

function Groups() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const [groups, setGroups] = useState<{ id: number; groupName: string }[]>([]);

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

  const handleCircleButtonClick = () => {
    navigate('/newGroup');
  };

  const handleGroupButtonClick = (groupId : number) => {
    localStorage.setItem("groupId", String(groupId));
    navigate('/Group');
  };

  return (
    <div>
      <Link to={'/newGroup'}>
        <button className='newGroup'>New Group</button>
      </Link>
      <ul>
        {groups.map(group => (
          <li key={group.id}>
            <button onClick={() => handleGroupButtonClick(group.id)}>{group.groupName}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Groups;
