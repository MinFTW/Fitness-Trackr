/* eslint-disable react/prop-types */
import React from 'react';
import useRoutines from './hooks/useRoutines';
import '../css/RoutinesDetailed.css';

const RoutinesDetailed = () => {
  const { routineToDisplay, detailedRoutine, setDetailedRoutine } =
    useRoutines();

  return (
    <div className='routines-page'>
      {
        <div className='detailed-routine'>
          <h3>{routineToDisplay.name}</h3>
          <p>Goal: {routineToDisplay.goal}</p>
          <p>Created By: {routineToDisplay.creatorName}</p>

          <h3 className='detailed-routine-activities'>Activities</h3>
          {routineToDisplay.activities.length === 0 && <p>No activities</p>}
          {routineToDisplay.activities.length !== 0 &&
            routineToDisplay.activities.map((activity) => {
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
      }

      {
        <button
          id='routine-back-button'
          className='create-button'
          onClick={() => {
            setDetailedRoutine(!detailedRoutine);
          }}
        >
          Back
        </button>
      }
    </div>
  );
};

export default RoutinesDetailed;
