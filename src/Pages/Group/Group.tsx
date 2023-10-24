import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Group.css';

function Group() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const groupId = searchParams.get('id');
  const navigate = useNavigate();

  interface Item {
    title: string;
    value: number;
  }

  const [groupData, setGroupData] = useState<{ groupName: string; items: Item[] } | null>(null);

  useEffect(() => {
    // Küldj egy GET kérést a Spring szervernek az adatok lekéréséhez
    axios.get(`http://localhost:8080/groupData/${groupId}`)
      .then((response) => {
        console.log('Group data:', response.data);
        setGroupData(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch group data:', error);
      });
  }, [groupId]);

  const handleCircleButtonClick = () => {
    navigate('/newitem');
  };

  if (groupData === null) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{groupData.groupName}</h1>
      <h2>Total dues: 200 USD</h2>
      <div className='item-container'>
        {groupData.items.map((item, index) => (
          <div className='item' key={index}>
            <div className='item-title'>{item.title}</div>
            <div className='item-value'>{item.value} USD</div>
          </div>
        ))}
        <div className="circle-button" onClick={handleCircleButtonClick}>
          <div className="plus">+</div>
        </div>
      </div>
    </div>
  );
}

export default Group;
