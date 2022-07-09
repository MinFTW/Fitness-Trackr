/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import useUser from './hooks/useUser';
import '../css/RoutinesUpdate.css';
import {
  updateRoutine,
  deleteRoutine,
  addActivityToRoutine,
} from '../api/index';

function RoutinesUpdate({ routineToUpdate, updateForm, setUpdateForm }) {
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { token } = useUser();

  const handleCheckbox = () => {
    setIsPublic(!isPublic);
  };

  const handleDeleteRoutine = async () => {
    const routineId = routineToUpdate.id;
    const confirmDelete = confirm('Delete Routine?');
    if (confirmDelete) {
      await deleteRoutine(token, routineId);
    }
    setSubmitted(!submitted);
    setUpdateForm(!updateForm);
  };

  return (
    <div className='update-routine-page'>
      {
        <div className='detailed-routine'>
          <h3 className='routine-name'>{routineToUpdate.name}</h3>
          <p>Goal: {routineToUpdate.goal}</p>

          <h3 className='detailed-routine-activities'>Activities</h3>
          {routineToUpdate.activities &&
            routineToUpdate.activities.map((activity) => {
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
          <button
            className='myroutines-delete-button'
            onClick={() => {
              handleDeleteRoutine(routineToUpdate.id);
            }}
          >
            Delete
          </button>
        </div>
      }

      {
        <div className='form-group'>
          <fieldset id='update-routine-form'>
            <legend>Update Routine</legend>
            <form
              onSubmit={async (event) => {
                event.preventDefault();
                const result = await updateRoutine(
                  token,
                  routineToUpdate.id,
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

          <fieldset id='add-activity-form'>
            <legend>Add Activity to Routine</legend>
            <form
              onSubmit={async (event) => {
                event.preventDefault();
                const result = await addActivityToRoutine(
                  token,
                  routineToUpdate.id
                  // activityId,
                  // count,
                  // duration
                );
                if (result.message) return alert(result.message);
                setName('');
                setGoal('');
                setSubmitted(!submitted);
                alert('Added activity to routine successfully');
              }}
            >
              <button id='update-routine-button' type='submit'>
                Add Activity
              </button>
            </form>
          </fieldset>
        </div>
      }

      {
        <button
          className='detailed-routine-back-button'
          onClick={() => {
            setUpdateForm(!updateForm);
          }}
        >
          Back
        </button>
      }
    </div>
  );
}

export default RoutinesUpdate;
