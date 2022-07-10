import React, { useState, useEffect } from 'react';
import useUser from './hooks/useUser';
import useRoutines from './hooks/useRoutines';
import useActivities from './hooks/useActivities';
import {
  updateRoutine,
  addActivityToRoutine,
  updateRoutineActivity,
  fetchAllActivities,
} from '../api/index';
import '../css/UpdateForms.css';

function UpdateForms({ updateActivity, activityToUpdate }) {
  const [count, setCount] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPublic, setIsPublic] = useState(false);
  const [activityToAdd, setActivityToAdd] = useState('');
  const { token, submitted, setSubmitted } = useUser();
  const { routineToUpdate, name, setName, goal, setGoal } = useRoutines();
  const { activities, setActivities } = useActivities();
  console.log(activities);

  const handleCheckbox = () => {
    setIsPublic(!isPublic);
  };

  useEffect(() => {
    const getActivities = async () => {
      const result = await fetchAllActivities();
      setActivities(result);
    };
    getActivities();
  }, []);

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
          <option value='select'>Select Activity</option>
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

      {updateActivity && (
        <fieldset id='update-activity-form' className='create-forms'>
          <legend>Update Activity</legend>
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              const result = await updateRoutineActivity(
                token,
                activityToUpdate,
                count,
                duration
              );
              if (result.message) return alert(result.message);
              setCount(0);
              setDuration(0);
              setSubmitted(!submitted);
              alert('Activity updated successfully');
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
              Update Activity
            </button>
          </form>
        </fieldset>
      )}
    </div>
  );
}

export default UpdateForms;
