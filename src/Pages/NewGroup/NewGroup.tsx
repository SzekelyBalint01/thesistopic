import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './NewGroup.css';

function NewGroup() {
  const [groupName, setGroupName] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value);
  };

  const handleCreateGroup = () => {
    // Send the groupName to your Spring Boot API using Axios
    axios.post('http://localhost:8080/crateGroup', { groupName })
      .then((response) => {
        console.log('Group created:', response.data);
        const GroupId = response.data.id
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
      <div className="input-container">
        <input
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleCreateGroup}>Create</button>
    </div>
  );
}

export default NewGroup;
