import { useState, useEffect } from 'react';
import UserContext from '../UserContext';

const UserProvider = ({ children }) => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const localStorageToken = localStorage.getItem('token');
    localStorageToken && setToken(localStorageToken);
  }, [token]);

  return (
    <UserContext.Provider value={{ token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
