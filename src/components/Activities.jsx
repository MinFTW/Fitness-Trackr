import React, { useEffect, useState } from 'react';
import { fetchAllActivities } from '../api/index';
import '../css/Activities.css';

const Activities = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const getActivities = async () => {
      const result = await fetchAllActivities();
      setActivities(result);
    };
    getActivities();
  }, []);

  return (
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
  );
};

export default Activities;
