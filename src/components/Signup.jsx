import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUser } from '../api';
import useUser from './hooks/useUser';
import '../css/Signup.css';

const Signup = () => {
  const { setToken, username, setUsername, password, setPassword } = useUser();
  const [confirmPassword, setConfirmPassword] = useState('');
  let navigate = useNavigate();

  const checkPassword = async () => {
    if (password !== confirmPassword) return alert('Passwords do not match');
    if (username && password === confirmPassword) {
      const result = await registerUser(username, password);

      if (result.data === null) return alert('Username already exists');
      setToken(result.data.token);
      localStorage.setItem('token', result.data.token);
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      alert(`${result.data.message}`);
      await loginUser(username, password);
      navigate('/myroutines');
    }
  };

  return (
    <>
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
              className='signup-input'
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
              className='signup-input'
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
              className='signup-input'
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

          <button className='create-button'> Sign Up</button>
        </form>
      </fieldset>
    </>
  );
};

export default Signup;
