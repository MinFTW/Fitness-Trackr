import { useContext } from 'react';
import UserContext from '../../UserContext';

const useUser = () => {
  const { token, setToken, username, setUsername, password, setPassword } =
    useContext(UserContext);

  return {
    token,
    setToken,
    username,
    setUsername,
    password,
    setPassword,
  };
};

export default useUser;
