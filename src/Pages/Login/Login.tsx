import React, { FormEvent, useState } from 'react';
import './Login.css'; 
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const navigate = useNavigate();
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Create a user object with the form data
    const user = {
      email,
      password,
    };

    
    axios.post('http://localhost:8080/login', user) 
      .then((response) => {
        if(response.status === 202){
          navigate('/Home')
          localStorage.setItem("username", response.data.username)
        }else if(response.status === 204){
          toast.error(response.status, {
            position: 'top-center',
            autoClose: 5000, // Adjust the duration
          
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
    <div className="login-container">
      <div className="header">Bejelentkezés</div>
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
        <button type="submit" className="submit-button">Bejelentkezés</button>
      </form>
      <Link to="/Registration">
        <button className="submit-button">Registráció</button>
      </Link>
    </div>
  );
}



export default Login;
