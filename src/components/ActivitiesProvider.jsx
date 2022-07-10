import React, { useState } from 'react';
import ActivitiesContext from '../ActivitiesContext';

// eslint-disable-next-line react/prop-types
const ActivitiesProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  return (
    <ActivitiesContext.Provider
      value={{
        activities,
        setActivities,
        name,
        setName,
        description,
        setDescription,
      }}
    >
      {children}
    </ActivitiesContext.Provider>
  );
};

export default ActivitiesProvider;
