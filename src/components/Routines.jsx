import React, { useEffect, useState } from 'react';
import { fetchAllPublicRoutines } from '../api/index';
import { RoutinesDetailed } from './index';
import '../css/Routines.css';

const Routines = () => {
  const [routines, setRoutines] = useState([]);
  const [detailedRoutine, setDetailedRoutine] = useState(false);
  const [routineToDisplay, setRoutineToDisplay] = useState([]);

  useEffect(() => {
    const getRoutines = async () => {
      const result = await fetchAllPublicRoutines();
      setRoutines(result);
    };
    getRoutines();
  }, []);

  return (
    <div className='all-routines'>
      <h2 className='routines-header'>Public Routines</h2>
      {!detailedRoutine &&
        routines.map((routine) => {
          return (
            <div
              key={routine.id}
              className='single-routine'
              onClick={() => {
                setRoutineToDisplay(routine);
                setDetailedRoutine(!detailedRoutine);
              }}
            >
              <h3 className='routine-name'>{routine.name}</h3>
              <p>Goal: {routine.goal}</p>
              <p>Created By: {routine.creatorName}</p>
            </div>
          );
        })}

      {detailedRoutine && (
        <RoutinesDetailed
          routineToDisplay={routineToDisplay}
          detailedRoutine={detailedRoutine}
          setDetailedRoutine={setDetailedRoutine}
        />
      )}
    </div>
  );
};

export default Routines;
