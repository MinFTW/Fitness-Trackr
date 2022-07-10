import { useContext } from 'react';
import UserContext from '../../UserContext';

const useUser = () => {
  const {
    token,
    setToken,
    username,
    setUsername,
    password,
    setPassword,
    submitted,
    setSubmitted,
  } = useContext(UserContext);

  return {
    token,
    setToken,
    username,
    setUsername,
    password,
    setPassword,
    submitted,
    setSubmitted,
  };
};

export default useUser;
