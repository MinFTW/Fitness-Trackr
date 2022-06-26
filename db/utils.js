const { attachActivitiesToRoutines } = require('./activities');

async function filterActivities(routines) {
  const activities = await attachActivitiesToRoutines(routines);

  for (const routine of routines) {
    const filteredActivities = activities.filter((activity) => {
      return activity.routineId === routine.id;
    });

    routine.activities = filteredActivities;
  }

  return routines;
}

module.exports = { filterActivities };
