import React from 'react';
import useUser from './hooks/useUser';
import { useNavigate } from 'react-router-dom';
import '../css/Logout.css';

function Logout() {
  const { setToken, setUsername } = useUser();
  let navigate = useNavigate();

  return (
    <button
      id='logout-button'
      onClick={() => {
        setToken('');
        setUsername('');
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/');
      }}
    >
      Logout
    </button>
  );
}

export default Logout;
