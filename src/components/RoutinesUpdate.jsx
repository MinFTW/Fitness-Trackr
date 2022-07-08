import React, { useEffect, useState } from 'react';
import useUser from './hooks/useUser';
import { fetchPublicRoutinesByUser, updateRoutine } from '../api/index';
import '../css/RoutinesUpdate.css';

// eslint-disable-next-line react/prop-types
function RoutinesUpdate({ routineToUpdate, setMyRoutines }) {
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { token, username } = useUser();

  const handleCheckbox = () => {
    setIsPublic(!isPublic);
  };

  const fetchUserRoutines = async () => {
    const result = await fetchPublicRoutinesByUser(token, username);
    setMyRoutines(result);
  };

  useEffect(() => {
    fetchUserRoutines();
  }, [submitted]);

  return (
    <div className='update-routine-page'>
      <fieldset id='update-routine-form'>
        <legend>Update Routine</legend>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const result = await updateRoutine(
              token,
              routineToUpdate,
              name,
              goal,
              isPublic
            );
            if (result.message) return alert(result.message);
            setName('');
            setGoal('');
            setSubmitted(!submitted);
            alert('Routine updated successfully');
          }}
        >
          <div>
            <textarea
              className='update-routines-textarea'
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
              className='update-routines-textarea'
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
            <fieldset id='update-routine-public'>
              <legend>Set Public?</legend>
              <label htmlFor='yes'>Yes</label>
              <input
                className='update-routines-input'
                type='checkbox'
                name='yes'
                value={isPublic}
                onChange={(event) => {
                  handleCheckbox(event);
                }}
              ></input>
            </fieldset>
          </div>

          <button id='update-routine-button' type='submit'>
            Update Routine
          </button>
        </form>
      </fieldset>
    </div>
  );
}

export default RoutinesUpdate;
