import React from 'react';
import { loginUser } from '../api';
import useUser from './hooks/useUser';
import '../css/Login.css';

const Login = () => {
  const { setToken, username, setUsername, password, setPassword } = useUser();

  const handleLogin = async () => {
    const result = await loginUser(username, password);

    if (result.data) {
      setToken(result.data.token);
      localStorage.setItem('username', username);
      localStorage.setItem('token', result.data.token);
    } else {
      return alert('Username or password incorrect, please try again');
    }
  };

  return (
    <div id='login-page'>
      <h2>Sign in to your account</h2>
      <fieldset id='login-form'>
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

          <button className='login-button'>Login</button>
        </form>
      </fieldset>
    </div>
  );
};

export default Login;
