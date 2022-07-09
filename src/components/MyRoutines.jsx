import React, { useEffect, useState } from 'react';
import useUser from './hooks/useUser';
import '../css/MyRoutines.css';
import { RoutinesUpdate } from './index';
import { fetchPublicRoutinesByUser, createRoutine } from '../api/index';

const MyRoutines = () => {
  const [myRoutines, setMyRoutines] = useState([]);
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const [routineToUpdate, setRoutineToUpdate] = useState([]);
  const { token, username } = useUser();

  const fetchUserRoutines = async () => {
    const result = await fetchPublicRoutinesByUser(token, username);
    setMyRoutines(result);
  };

  const handleCheckbox = () => {
    setIsPublic(!isPublic);
  };

  useEffect(() => {
    fetchUserRoutines();
  }, [submitted]);

  return (
    <div className='my-routines-page'>
      <div className='my-routines'>
        {!updateForm && <h2 className='my-routines-header'>My Routines</h2>}
        {myRoutines.length === 0 && <p>No routines</p>}
        {myRoutines.length !== 0 &&
          !updateForm &&
          myRoutines.map((myRoutine) => {
            return (
              <div
                key={myRoutine.id}
                className='my-routine'
                onClick={() => {
                  setUpdateForm(!updateForm);
                  setRoutineToUpdate(myRoutine);
                }}
              >
                <h3 className='routine-name'>{myRoutine.name}</h3>
                <p>Goal: {myRoutine.goal}</p>
                <p>Public: {myRoutine.isPublic ? 'yes' : 'no'}</p>
              </div>
            );
          })}
      </div>

      {!updateForm && (
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

      {updateForm && (
        <RoutinesUpdate
          routineToUpdate={routineToUpdate}
          updateForm={updateForm}
          setUpdateForm={setUpdateForm}
        />
      )}
    </div>
  );
};

export default MyRoutines;
