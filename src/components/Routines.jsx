import React, { useEffect } from 'react';
import { fetchAllPublicRoutines } from '../api/index';
import { RoutinesDetailed } from './index';
import useRoutines from './hooks/useRoutines';
import '../css/Routines.css';

const Routines = () => {
  const {
    routines,
    setRoutines,
    detailedRoutine,
    setDetailedRoutine,
    setRoutineToDisplay,
  } = useRoutines();

  useEffect(() => {
    const getRoutines = async () => {
      const result = await fetchAllPublicRoutines();
      setRoutines(result);
    };
    getRoutines();
  }, []);

  return (
    <div id='routines-page'>
      <h2 className='page-header'>Public Routines</h2>
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

      {detailedRoutine && <RoutinesDetailed />}
    </div>
  );
};

export default Routines;
