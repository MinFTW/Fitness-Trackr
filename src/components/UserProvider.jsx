import React, { useState, useEffect } from 'react';
import UserContext from '../UserContext';

// eslint-disable-next-line react/prop-types
const UserProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const localStorageToken = localStorage.getItem('token');
    localStorageToken && setToken(localStorageToken);
    const localStorageUsername = localStorage.getItem('username');
    localStorageUsername && setUsername(localStorageUsername);
  }, [token]);

  return (
    <UserContext.Provider
      value={{
        token,
        setToken,
        username,
        setUsername,
        password,
        setPassword,
        submitted,
        setSubmitted,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
