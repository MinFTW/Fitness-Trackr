import React, { useState } from 'react';
import { registerUser, loginUser } from '../api';
import '../css/Signup.css';
import useUser from './hooks/useUser';

const Signup = () => {
  const { setToken, username, setUsername, password, setPassword } = useUser();
  const [confirmPassword, setConfirmPassword] = useState('');

  const checkPassword = async () => {
    if (password !== confirmPassword) return alert('Passwords do not match');
    if (username && password === confirmPassword) {
      const result = await registerUser(username, password);

      if (result.data === null) return alert('Username already exists');
      setToken(result.data.token);
      localStorage.setItem('token', result.data.token);
      alert(`${result.data.message}`);
      await loginUser(username, password);
    }
  };

  return (
    <div id='register-page'>
      <h2>Signup for a free account</h2>
      <fieldset id='register-form'>
        <legend>Create New Account</legend>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            checkPassword();
          }}
        >
          <label htmlFor='username'>Username</label>
          <div>
            <input
              type='text'
              name='username'
              placeholder='6 to 20 characters'
              minLength='6'
              maxLength='20'
              required
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            ></input>
          </div>

          <div>
            <div>
              <label htmlFor='password'>Password</label>
            </div>
            <input
              type='password'
              name='password'
              placeholder='6 to 20 characters'
              minLength='6'
              maxLength='20'
              required
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            ></input>
          </div>

          <div>
            <div>
              <label htmlFor='confirmPassword'>Re-enter password</label>
            </div>
            <input
              type='password'
              name='confirmPassword'
              minLength='6'
              maxLength='20'
              required
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
            ></input>
          </div>

          <button className='register-button'> Sign Up</button>
        </form>
      </fieldset>
    </div>
  );
};

export default Signup;
