import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './NewGroup.css';

function NewGroup() {
  const [groupName, setGroupName] = useState('');
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Send the groupName to your Spring Boot API using Axios
    axios.post('http://localhost:8080/createGroup', { groupName }, {
    headers: {
      'Content-Type': 'application/json', // Állítsd be a megfelelő Content-Type értéket
    },
    params: {
      userId: userId,
    },
  }) 
      .then((response) => {
        console.log('Group created:', response.data);
        localStorage.setItem("groupId",response.data.id);
        const GroupId = localStorage.getItem("groupId");
        navigate(`/Group?id=${GroupId}`);
      })
      .catch((error) => {
        console.error('Group creation failed:', error);
        // Handle errors, show an error message, etc.
      });
  };  

  return (
    <div className="new-group-container">
      <h2>Create a New Group</h2>
      <form onSubmit={handleSubmit} className='new-group-form'>
        <div className="input-container">
          <input
            type="text"
            placeholder="Group Name"
            value={groupName}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default NewGroup;
