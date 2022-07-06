import React, { useEffect, useState } from 'react';
import { fetchAllActivities, createActivity } from '../api/index';
import useUser from './hooks/useUser';
import '../css/Activities.css';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { token } = useUser();

  useEffect(() => {
    const getActivities = async () => {
      const result = await fetchAllActivities();
      setActivities(result);
    };
    getActivities();
  }, [submitted]);

  return (
    <div className='activities-page'>
      <div className='all-activities'>
        <h2>Activities</h2>
        {activities.map((activity) => {
          return (
            <div key={activity.id} className='single-activity'>
              <h3>{activity.name}</h3>
              <p>Description: {activity.description}</p>
            </div>
          );
        })}
      </div>

      {token && (
        <div className='create-activity'>
          <fieldset id='new-activity-form'>
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

              <button id='new-activity-button' type='submit'>
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
