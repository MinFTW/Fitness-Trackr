import React, { useEffect, useState } from 'react';
import { RoutinesUpdate } from './index';
import { fetchPublicRoutinesByUser, createRoutine } from '../api/index';
import useUser from './hooks/useUser';
import useRoutines from './hooks/useRoutines';
import '../css/MyRoutines.css';

const MyRoutines = () => {
  const [updateForm, setUpdateForm] = useState(false);
  const { token, username, submitted, setSubmitted } = useUser();
  const {
    myRoutines,
    setMyRoutines,
    name,
    setName,
    goal,
    setGoal,
    isPublic,
    setIsPublic,
    setRoutineToUpdate,
  } = useRoutines();

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
    <div id='my-routines-page'>
      <div id='my-routines'>
        {!updateForm && <h2 className='page-header'>My Routines</h2>}
        {myRoutines.length === 0 && <p>No routines</p>}
        {myRoutines.length !== 0 &&
          !updateForm &&
          myRoutines.map((myRoutine) => {
            return (
              <div
                key={myRoutine.id}
                className='single-routine'
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
          <fieldset className='create-forms'>
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
                  className='forms-textarea'
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
                  className='forms-textarea'
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
                <fieldset className='new-routine-public'>
                  <legend>Set Public?</legend>
                  <label htmlFor='yes'>Yes</label>
                  <input
                    type='checkbox'
                    name='yes'
                    value={isPublic}
                    onChange={(event) => {
                      handleCheckbox(event);
                    }}
                  ></input>
                </fieldset>
              </div>

              <button className='create-button' type='submit'>
                Create Routine
              </button>
            </form>
          </fieldset>
        </div>
      )}

      {updateForm && (
        <RoutinesUpdate updateForm={updateForm} setUpdateForm={setUpdateForm} />
      )}
    </div>
  );
};

export default MyRoutines;
