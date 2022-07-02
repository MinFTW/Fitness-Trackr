import { useContext } from 'react';
import UserContext from '../../UserContext';

const useUser = () => {
  const { token, setToken } = useContext(UserContext);

  return {
    token,
    setToken,
  };
};

export default useUser;
