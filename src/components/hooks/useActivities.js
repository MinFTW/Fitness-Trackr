import { useContext } from 'react';
import ActivitiesContext from '../../ActivitiesContext';

const useActivities = () => {
  const {
    activities,
    setActivities,
    name,
    setName,
    description,
    setDescription,
  } = useContext(ActivitiesContext);

  return {
    activities,
    setActivities,
    name,
    setName,
    description,
    setDescription,
  };
};

export default useActivities;
