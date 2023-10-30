import React, { FormEvent, useState } from 'react';
import './Profile.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true); 
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setConfirmPassword(newPassword);
    comparePasswords(newPassword);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const comparePasswords = (confirmPasswordValue: string) => {
    // Az összehasonlítás és a state frissítése
    if (password !== confirmPasswordValue) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!passwordsMatch) {
      toast.error('Password does not match', {
        position: 'top-center',
        autoClose: 5000,
      });
      return;
    }

    // Create a user object with the form data
    const user = {
      email,
      password,
      confirmPassword,
      username,
    };

    axios
      .post('http://localhost:8080/registration', user)
      .then((response) => {
        console.log('Registration successful:', response.data);
        if (response.status === 200) {
          navigate('/');
        } else if (response.status === 409) {
          toast.error(response.data, {
            position: 'top-center',
            autoClose: 5000,
          });
        }
      })
      .catch((error) => {
        toast.error(error, {
          position: 'top-center',
          autoClose: 5000,
        });
      });
  };

  return (
    <div className="registration-container">
      <div className='screen'>
      <form className='screen__content' onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
            className="input"
            placeholder='Email address'
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
            className="input"
            placeholder='Password'
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
            className="input"
            placeholder='Confirm Password'
            style={{ borderColor: passwordsMatch ? '' : 'red' }}
          />
          {!passwordsMatch && <p style={{ color: 'red' }}>Password does not match</p>}
        </div>
        <div className="input-container">
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            required
            className="input"
            placeholder='Username'
          />
        </div>
        <button type="submit" className="submit-button">Regisztráció</button>
      </form>
      <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4"></span>
            <span className="screen__background__shape screen__background__shape3"></span>
            <span className="screen__background__shape screen__background__shape2"></span>
            <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
       <ToastContainer />
    </div>
  );
}
export default Profile;
