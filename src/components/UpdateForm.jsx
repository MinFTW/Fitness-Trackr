import React, { useEffect, useState } from 'react';
import useUser from './hooks/useUser';
import useRoutines from './hooks/useRoutines';
import useActivities from './hooks/useActivities';
import '../css/UpdateForm.css';
import {
  updateRoutine,
  addActivityToRoutine,
  fetchAllActivities,
} from '../api/index';

function UpdateForm() {
  const [count, setCount] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activityToAdd, setActivityToAdd] = useState('');
  const { token, submitted, setSubmitted } = useUser();
  const { activities, setActivities } = useActivities();
  const {
    routineToUpdate,
    name,
    setName,
    goal,
    setGoal,
    isPublic,
    setIsPublic,
  } = useRoutines();

  const handleCheckbox = () => {
    setIsPublic(!isPublic);
  };

  useEffect(() => {
    const getActivities = async () => {
      const result = await fetchAllActivities();
      setActivities(result);
    };
    getActivities();
  }, [submitted]);

  return (
    <div id='form-group'>
      <fieldset className='create-forms'>
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

          <button className='create-button' type='submit'>
            Update Routine
          </button>
        </form>
      </fieldset>

      <fieldset id='add-activity-form'>
        <legend>Add Activity to Routine</legend>
        <select
          name='activities'
          id='select-activities'
          value={activityToAdd.id}
          onChange={(event) => setActivityToAdd(event.target.value)}
        >
          {activities.map((activity, index) => {
            return (
              <option key={index} value={activity.id}>
                {activity.name}
              </option>
            );
          })}
        </select>

        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const result = await addActivityToRoutine(
              token,
              routineToUpdate.id,
              activityToAdd,
              count,
              duration
            );
            if (result.message) return alert(result.message);
            setSubmitted(!submitted);
            alert('Added activity to routine successfully');
          }}
        >
          <label htmlFor='count'>Count:</label>
          <input
            type='number'
            name='count'
            value={count}
            onChange={(event) => {
              setCount(event.target.value);
            }}
          ></input>

          <label htmlFor='duration'>Duration:</label>
          <input
            type='number'
            name='duration'
            value={duration}
            onChange={(event) => {
              setDuration(event.target.value);
            }}
          ></input>

          <button className='create-button' type='submit'>
            Add Activity
          </button>
        </form>
      </fieldset>
    </div>
  );
}

export default UpdateForm;
