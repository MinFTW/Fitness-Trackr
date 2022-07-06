import React from 'react';
import useUser from './hooks/useUser';
import { useNavigate } from 'react-router-dom';
import '../css/Logout.css';

function Logout() {
  const { setToken } = useUser();
  let navigate = useNavigate();

  return (
    <button
      className='logout-button'
      onClick={() => {
        setToken('');
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
