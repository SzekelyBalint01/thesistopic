import React, { useState } from 'react';
import './Registration.css';

function Registration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Itt ellenőrizheted az űrlap adatok helyességét és végrehajthatod a regisztrációt.
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    console.log('Username:', username);
  };

  return (
    <div className="registration-container">
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
      <div className="gmail-registration">
        <p>Regisztráció Gmail-el:</p>
        <button onClick={registerWithGmail} className="gmail-button">Gmail regisztráció</button>
      </div>
    </div>
  );
}

function registerWithGmail() {
  // Ide írd meg a Gmail regisztráció logikát, például OAuth használatával.
  console.log('Regisztráció Gmail-el...');
}

export default Registration;
