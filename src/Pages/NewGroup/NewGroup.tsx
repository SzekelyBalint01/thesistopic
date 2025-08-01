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
   
    axios.post('http://localhost:8080/createGroup', { groupName }, {
    headers: {
      'Content-Type': 'application/json', 
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
       
      });
  };  

  return (
    <div className="new-group-container">
      <h1>Create a New Group</h1>
      <form onSubmit={handleSubmit}>
        <div className='box' >
 <div className="input-container">
          <input
            type="text"
            placeholder="Group Name"
            value={groupName}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
}

export default NewGroup;
