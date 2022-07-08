import React, { useEffect, useState } from 'react';
import { fetchAllPublicRoutines } from '../api/index';
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
        <div className='detailed-routine'>
          <h3 className='routine-name'>{routineToDisplay.name}</h3>
          <p>Goal: {routineToDisplay.goal}</p>
          <p>Created By: {routineToDisplay.creatorName}</p>

          <h3 className='detailed-routine-activities'>Activities</h3>
          {routineToDisplay.activities.map((activity) => {
            return (
              <div key={activity.id}>
                <p>Name: {activity.name}</p>
                <p>Description: {activity.description}</p>
                <p>Count: {activity.count}</p>
                <p>Duration: {activity.duration}</p>
                <br></br>
              </div>
            );
          })}
        </div>
      )}
      {detailedRoutine && (
        <button
          className='detailed-routine-back-button'
          onClick={() => {
            setDetailedRoutine(!detailedRoutine);
          }}
        >
          Back
        </button>
      )}
    </div>
  );
};

export default Routines;
