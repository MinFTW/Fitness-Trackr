import React, { useEffect, useState } from 'react';
import { fetchAllPublicRoutines } from '../api/index';
import '../css/Routines.css';

const Routines = () => {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    const getRoutines = async () => {
      const result = await fetchAllPublicRoutines();
      setRoutines(result);
    };
    getRoutines();
  }, []);

  return (
    <div className='all-routines'>
      <h2>Routines</h2>
      {routines.map((routine) => {
        return (
          <div key={routine.id} className='single-routine'>
            <h3>{routine.name}</h3>
            <p>Goal: {routine.goal}</p>
            <p>Created By: {routine.creatorName}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Routines;
