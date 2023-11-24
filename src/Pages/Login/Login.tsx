import React, { FormEvent, useState, useEffect } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faChevronRight } from '@fortawesome/free-solid-svg-icons';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  localStorage.setItem("username", "");
  localStorage.setItem("groupId", "");
  localStorage.setItem("itemId", "");
  localStorage.setItem("userId", "");
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const navigate = useNavigate();

  useEffect(() => {
    // Hitelesítési hibakezelő hozzáadása az Axios klienshez
    const authInterceptor = axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          // Hitelesítési hiba (401) esetén toast üzenet megjelenítése
          toast.error('Wrong Email or Password', {
            position: 'top-center',
            autoClose: 5000, // Toast eltűnési ideje
          });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      // Hitelesítési hibakezelő eltávolítása a komponens megszűnéskor
      axios.interceptors.response.eject(authInterceptor);
    };
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Create a user object with the form data
    const user = {
      email,
      password,
    };

    axios
      .post('http://localhost:8080/login', user,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
      )
      .then((response) => {
        if (response.status === 202) {
          navigate('/Groups');
          localStorage.setItem('username', response.data.username);
          localStorage.setItem('userId', response.data.id);
        }
      })
      .catch((error) => {
        console.error("Hiba történt:", error);
        toast.error(error, {
          position: 'top-center',
          autoClose: 5000,
        });
      });
  };

  function handleRegistrationOnClick(): void {
    navigate('/Registration');
  }

  return (
    <div className="container">
      

      <div className="screen">
        <div className="screen__content">
          <form className="login" onSubmit={handleSubmit}>
            <div className="login__field">
              <FontAwesomeIcon icon={faUser} className="login__icon" />
              <input
                type="text"
                className="login__input"
                placeholder="User name / Email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="login__field">
              <FontAwesomeIcon icon={faLock} className="login__icon" />
              <input
                type="password"
                className="login__input"
                placeholder="Password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <button className="button login__submit" type="submit">
              <span className="button__text">Log In Now</span>
              <FontAwesomeIcon icon={faChevronRight} className="button__icon" />
            </button>
          </form>
          <button onClick={() => handleRegistrationOnClick()} className="registration-btn">
            Registration
          </button>
        </div>
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

export default Login;
