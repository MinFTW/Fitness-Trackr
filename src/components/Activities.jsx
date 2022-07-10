import React, { useEffect } from 'react';
import { createActivity, fetchAllActivities } from '../api/index';
import useUser from './hooks/useUser';
import useActivities from './hooks/useActivities';
import '../css/Activities.css';

const Activities = () => {
  const { token, submitted, setSubmitted } = useUser();
  const {
    activities,
    setActivities,
    name,
    setName,
    description,
    setDescription,
  } = useActivities();

  useEffect(() => {
    const getActivities = async () => {
      const result = await fetchAllActivities();
      setActivities(result);
    };
    getActivities();
  }, [submitted]);

  return (
    <div id='activities-page'>
      <div id='all-activities'>
        <h2 className='page-header'>Public Activities</h2>
        {activities.map((activity) => {
          return (
            <div key={activity.id} id='single-activity'>
              <h3>{activity.name}</h3>
              <p>Description: {activity.description}</p>
            </div>
          );
        })}
      </div>

      {token && (
        <div>
          <fieldset className='create-forms'>
            <legend>New Activity</legend>
            <form
              onSubmit={async (event) => {
                event.preventDefault();
                const result = await createActivity(token, name, description);
                if (result.message) return alert(result.message);
                setName('');
                setDescription('');
                setSubmitted(!submitted);
                alert('Activity created successfully');
              }}
            >
              <div>
                <textarea
                  className='forms-textarea'
                  type='text'
                  placeholder='Add a name'
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
                  placeholder='Add description'
                  maxLength='200'
                  rows='3'
                  cols='15'
                  required
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                ></textarea>
              </div>

              <button className='create-button' type='submit'>
                Create Activity
              </button>
            </form>
          </fieldset>
        </div>
      )}
    </div>
  );
};

export default Activities;
