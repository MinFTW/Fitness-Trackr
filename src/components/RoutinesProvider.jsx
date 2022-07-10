import React, { useState } from 'react';
import RoutinesContext from '../RoutinesContext';

// eslint-disable-next-line react/prop-types
const RoutinesProvider = ({ children }) => {
  const [routines, setRoutines] = useState([]);
  const [detailedRoutine, setDetailedRoutine] = useState(false);
  const [routineToDisplay, setRoutineToDisplay] = useState([]);
  const [myRoutines, setMyRoutines] = useState([]);
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const [routineToUpdate, setRoutineToUpdate] = useState([]);

  return (
    <RoutinesContext.Provider
      value={{
        routines,
        setRoutines,
        detailedRoutine,
        setDetailedRoutine,
        routineToDisplay,
        setRoutineToDisplay,
        myRoutines,
        setMyRoutines,
        name,
        setName,
        goal,
        setGoal,
        isPublic,
        setIsPublic,
        updateForm,
        setUpdateForm,
        routineToUpdate,
        setRoutineToUpdate,
      }}
    >
      {children}
    </RoutinesContext.Provider>
  );
};

export default RoutinesProvider;
