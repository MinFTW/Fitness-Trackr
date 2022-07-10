/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import useUser from './hooks/useUser';
import useRoutines from './hooks/useRoutines';
import UpdateForms from './UpdateForms';
import '../css/MyRoutinesUpdate.css';
import { deleteRoutineActivity } from '../api/index';

function MyRoutinesUpdate({ updateForm, setUpdateForm }) {
  const { token, submitted, setSubmitted } = useUser();
  const { routineToUpdate } = useRoutines();
  const [activityToUpdate, setActivityToUpdate] = useState([]);
  const [updateActivity, setUpdateActivity] = useState(false);

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
            routineToUpdate.activities.map((activity, index) => {
              return (
                <div key={activity.id}>
                  <p>Name: {activity.name}</p>
                  <p>Description: {activity.description}</p>
                  <p>Count: {activity.count}</p>
                  <p>Duration: {activity.duration}</p>
                  <button
                    id='update-activity-button'
                    className='create-button'
                    onClick={async () => {
                      setUpdateActivity(!updateActivity);
                      setActivityToUpdate(
                        routineToUpdate.activities[index].routineActivityId
                      );
                    }}
                  >
                    Update Activity
                  </button>
                  <button
                    className='delete-button'
                    onClick={async () => {
                      const confirmDelete = confirm('Delete Routine?');
                      if (confirmDelete) {
                        await deleteRoutineActivity(
                          token,
                          routineToUpdate.activities[index].routineActivityId
                        );
                      }
                      setSubmitted(!submitted);
                    }}
                  >
                    Delete Activity
                  </button>
                </div>
              );
            })}
        </div>
      }

      {
        <UpdateForms
          updateActivity={updateActivity}
          activityToUpdate={activityToUpdate}
        />
      }

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

export default MyRoutinesUpdate;
