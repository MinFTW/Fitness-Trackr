import { useState, useEffect } from 'react';
import UserContext from '../UserContext';

const UserProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const localStorageToken = localStorage.getItem('token');
    localStorageToken && setToken(localStorageToken);
  }, [token]);

  return (
    <UserContext.Provider
      value={{ token, setToken, username, setUsername, password, setPassword }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
