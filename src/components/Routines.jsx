import React, { useEffect, useState } from 'react';
import { fetchAllPublicRoutines } from '../api/index';
import '../css/Routines.css';

const Routines = () => {
  const [routines, setRoutines] = useState([]);

  const handleClick = async (event) => {
    console.log(event);
  };

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
      {routines.map((routine) => {
        return (
          <div
            key={routine.id}
            className='single-routine'
            onClick={(event) => {
              handleClick(event);
            }}
          >
            <h3 className='routine-name'>{routine.name}</h3>
            <p>Goal: {routine.goal}</p>
            <p>Created By: {routine.creatorName}</p>
            <h3 className='activity-header'>Activities</h3>
            {routine.activities.map((activity) => {
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
        );
      })}
    </div>
  );
};

export default Routines;
