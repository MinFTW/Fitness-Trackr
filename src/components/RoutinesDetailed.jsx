/* eslint-disable react/prop-types */
import React from 'react';
import '../css/RoutinesDetailed.css';

const RoutinesDetailed = ({
  routineToDisplay,
  detailedRoutine,
  setDetailedRoutine,
}) => {
  return (
    <div className='all-routines'>
      {
        <div className='detailed-routine'>
          <h3>{routineToDisplay.name}</h3>
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
      }

      {
        <button
          className='detailed-routine-back-button'
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
