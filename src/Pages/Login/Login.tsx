import React, { useState } from 'react';
import './Login.css'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Itt ellenőrizheted az email és jelszó helyességét és végrehajthatod a bejelentkezést.
    console.log('Email:', email);
    console.log('Password:', password);
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
      <div className="gmail-login">
        <p>Bejelentkezés Gmail-el:</p>
        <button onClick={loginWithGmail} className="gmail-button">Gmail bejelentkezés</button>
      </div>
    </div>
  );
}

function loginWithGmail() {
  // Ide írd meg a Gmail bejelentkezési logikát, például OAuth használatával.
  console.log('Bejelentkezés Gmail-el...');
}

export default Login;
