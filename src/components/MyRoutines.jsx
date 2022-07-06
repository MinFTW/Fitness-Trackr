import React, { useEffect, useState } from 'react';
import { fetchPublicRoutinesByUser, createRoutine } from '../api/index';
import useUser from './hooks/useUser';
import '../css/MyRoutines.css';

const MyRoutines = () => {
  const [myRoutines, setMyRoutines] = useState([]);
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { token, username } = useUser();

  const fetchUserRoutines = async () => {
    const result = await fetchPublicRoutinesByUser(token, username);
    setMyRoutines(result);
  };

  useEffect(() => {
    fetchUserRoutines();
  }, [submitted]);

  return (
    <div className='my-routines-page'>
      <div className='my-routines'>
        <h2>My Routines</h2>
        {myRoutines ? (
          myRoutines.map((myRoutine) => {
            return (
              <div key={myRoutine.id} className='single-routine'>
                <h3>{myRoutine.name}</h3>
                <p>Description: {myRoutine.goal}</p>
              </div>
            );
          })
        ) : (
          <p>No routines</p>
        )}
      </div>

      {token && (
        <div className='create-routine'>
          <fieldset id='new-routine-form'>
            <legend>New Routine</legend>
            <form
              onSubmit={async (event) => {
                event.preventDefault();
                const result = await createRoutine(token, name, goal);
                if (result.message) return alert(result.message);
                setName('');
                setGoal('');
                setSubmitted(!submitted);
                alert('Routine created successfully');
              }}
            >
              <div>
                <textarea
                  type='text'
                  placeholder='Add name'
                  maxLength='50'
                  rows='1'
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                ></textarea>
              </div>

              <div>
                <textarea
                  type='text'
                  placeholder='Add goal'
                  maxLength='200'
                  rows='3'
                  cols='15'
                  required
                  value={goal}
                  onChange={(event) => setGoal(event.target.value)}
                ></textarea>
              </div>

              <button id='new-routine-button' type='submit'>
                Create Routine
              </button>
            </form>
          </fieldset>
        </div>
      )}
    </div>
  );
};

export default MyRoutines;
