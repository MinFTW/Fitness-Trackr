import React, { useEffect, useState } from 'react';
import useUser from './hooks/useUser';
import '../css/MyRoutines.css';
import {
  fetchPublicRoutinesByUser,
  createRoutine,
  deleteRoutine,
} from '../api/index';

const MyRoutines = () => {
  const [myRoutines, setMyRoutines] = useState([]);
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [updateRoutine, setUpdateRoutine] = useState(false);
  const { token, username } = useUser();

  const fetchUserRoutines = async () => {
    const result = await fetchPublicRoutinesByUser(token, username);
    setMyRoutines(result);
  };

  const handleCheckbox = () => {
    setIsPublic(!isPublic);
  };

  const handleDeleteRoutine = async (myRoutine) => {
    const routineId = myRoutine.id;
    const confirmDelete = confirm('Delete Routine?');
    if (confirmDelete) {
      await deleteRoutine(token, routineId);
    }
    setSubmitted(!submitted);
  };

  const handleUpdateRoutine = async () => {
    console.log(updateRoutine);
  };

  useEffect(() => {
    fetchUserRoutines();
  }, [submitted]);

  return (
    <div className='my-routines-page'>
      <div className='my-routines'>
        <h2 className='my-routines-header'>My Routines</h2>
        {myRoutines.length !== 0 ? (
          myRoutines.map((myRoutine) => {
            return (
              <div key={myRoutine.id} className='my-routine'>
                <h3>Name: {myRoutine.name}</h3>
                <h4>Goal: {myRoutine.goal}</h4>
                <p>Public: {myRoutine.isPublic ? 'yes' : 'no'}</p>
                <button
                  className='myroutines-update-button'
                  onClick={() => {
                    handleUpdateRoutine();
                    setUpdateRoutine(!updateRoutine);
                  }}
                >
                  Edit
                </button>
                <button
                  className='myroutines-delete-button'
                  onClick={() => {
                    handleDeleteRoutine(myRoutine);
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })
        ) : (
          <p>No routines</p>
        )}
      </div>

      {token && (
        <div>
          <fieldset id='new-routine-form'>
            <legend>New Routine</legend>
            <form
              onSubmit={async (event) => {
                event.preventDefault();
                const result = await createRoutine(token, name, goal, isPublic);
                if (result.message) return alert(result.message);
                setName('');
                setGoal('');
                setSubmitted(!submitted);
                alert('Routine created successfully');
              }}
            >
              <div>
                <textarea
                  className='my-routines-textarea'
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
                  className='my-routines-textarea'
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

              <div>
                <fieldset id='new-routine-public'>
                  <legend>Set Public?</legend>
                  <label htmlFor='yes'>Yes</label>
                  <input
                    className='my-routines-input'
                    type='checkbox'
                    name='yes'
                    value={isPublic}
                    onChange={(event) => {
                      handleCheckbox(event);
                    }}
                  ></input>
                </fieldset>
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
