import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api';
import useUser from './hooks/useUser';
import '../css/Login.css';

const Login = () => {
  const { setToken, username, setUsername, password, setPassword } = useUser();
  let navigate = useNavigate();

  const handleLogin = async () => {
    const result = await loginUser(username, password);

    if (result) {
      setToken(result.token);
      localStorage.setItem('username', username);
      localStorage.setItem('token', result.token);
      setUsername('');
      setPassword('');
      alert(`${result.message}`);
      navigate('/myroutines');
    } else {
      return alert('Username or password incorrect, please try again');
    }
  };

  return (
    <>
      <fieldset className='create-forms'>
        <legend>Login</legend>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleLogin();
          }}
        >
          <label>Username</label>
          <div>
            <input
              className='login-input'
              type='text'
              minLength='6'
              maxLength='20'
              required
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            ></input>
          </div>

          <label>Password</label>
          <div>
            <input
              className='login-input'
              type='password'
              minLength='6'
              maxLength='20'
              required
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            ></input>
          </div>

          <button className='create-button'>Login</button>
        </form>
      </fieldset>
    </>
  );
};

export default Login;
