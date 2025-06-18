import React, { FormEvent, useState, useEffect } from 'react';
import './Profile.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/userInfo', {
          params: {
            userId: Number(userId),
          },
        });

       
        setEmail(response.data.email);
        setUsername(response.data.username);

      } catch (error) {
        console.error('Hiba történt a kérés során:', error);
      }
    };

    fetchProfileData();
  }, [userId]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSave = () => {
  
    const userData = { email, username, userId };
    axios.put('http://localhost:8080/saveProfile', userData)
      .then((response) => {
        toast.success(() => (
          <div>
            <div>User data updated successfully! Please Re-login.</div>
            <button
              onClick={() => {
                toast.dismiss(); 
                navigate('/');
              }}
            >
              OK
            </button>
          </div>
        ), {
          position: 'top-center',
          autoClose: false, 
        });
      })
      .catch((error) => {
        toast.error('Error updating user data', {
          position: 'top-center',
          autoClose: false,
        });
      });
  };

  return (
    <div className="profile-container">
      <div className="centered-container">
        <div className='input-container'>
        <div className="input-field">
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="input-field">
          <label>Felhasználónév:</label>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        </div>
        <button onClick={handleSave}>Mentés</button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Profile;
