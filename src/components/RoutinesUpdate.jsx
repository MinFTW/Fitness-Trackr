/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from './hooks/useUser';
import useRoutines from './hooks/useRoutines';
import { deleteRoutine } from '../api/index';
import UpdateForm from './UpdateForm';
import '../css/RoutinesUpdate.css';

function RoutinesUpdate({ updateForm, setUpdateForm }) {
  const { token, submitted, setSubmitted } = useUser();
  const { routineToUpdate } = useRoutines();
  let navigate = useNavigate();

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
    <div id='update-routine-page'>
      {
        <div className='detailed-routine'>
          <h3 className='routine-name'>{routineToUpdate.name}</h3>
          <p>Goal: {routineToUpdate.goal}</p>
          <p>Public: {routineToUpdate.isPublic ? 'yes' : 'no'}</p>

          <h3 className='detailed-routine-activities'>Activities</h3>
          {routineToUpdate.activities.length === 0 && <p>No activities</p>}
          {routineToUpdate.activities.length !== 0 &&
            routineToUpdate.activities &&
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
            className='delete-button'
            onClick={() => {
              handleDeleteRoutine(routineToUpdate.id);
              setSubmitted(!submitted);
              navigate('/myroutines');
            }}
          >
            Delete Routine
          </button>
        </div>
      }

      {<UpdateForm updateForm={updateForm} setUpdateForm={setUpdateForm} />}

      {
        <button
          id='update-back-button'
          className='create-button'
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
