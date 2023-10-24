import React, { FormEvent, useState } from 'react';
import './Registration.css';
import axios from 'axios';
import { useNavigate   } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Registration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');

  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Create a user object with the form data
    const user = {
      email,
      password,
      confirmPassword,
      username,
    };

    
    axios.post('http://localhost:8080/registration', user) 
      .then((response) => {
        console.log('Registration successful:', response.data);
        if(response.status === 200){
          navigate('/')
        }else if(response.status === 409){
          toast.error(response.data, {
            position: 'top-center',
            autoClose: 5000, 
          });
        }
      })
      .catch((error) => {
        toast.error(error, {
          position: 'top-center',
          autoClose: 5000, // Adjust the duration
        });
      });
  };

  return (
    <div className="registration-container">
       <ToastContainer />
      <h2>Regisztráció</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="email" className="label">Email cím:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
            className="input"
          />
        </div>
        <div className="input-container">
          <label htmlFor="password" className="label">Jelszó:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
            className="input"
          />
        </div>
        <div className="input-container">
          <label htmlFor="confirmPassword" className="label">Jelszó újra:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
            className="input"
          />
        </div>
        <div className="input-container">
          <label htmlFor="username" className="label">Felhasználónév:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            required
            className="input"
          />
        </div>
        <button type="submit" className="submit-button">Regisztráció</button>
      </form>
    </div>
  );
}
export default Registration;
