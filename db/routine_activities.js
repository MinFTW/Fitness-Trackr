const client = require('./client');
const { getRoutineById } = require('./routines');

async function getRoutineActivityById(id) {
  try {
    const {
      rows: [routineActivity],
    } = await client.query(
      `
      SELECT *
      FROM routine_activities
      WHERE id = $1;
    `,
      [id]
    );

    return routineActivity;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function addActivityToRoutine({
  routineId,
  activityId,
  count,
  duration,
}) {
  try {
    const {
      rows: [routineActivity],
    } = await client.query(
      `
      INSERT INTO routine_activities("routineId", "activityId", count, duration)
      VALUES($1, $2, $3, $4)
      RETURNING *;
    `,
      [routineId, activityId, count, duration]
    );

    return routineActivity;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getRoutineActivitiesByRoutine({ id }) {
  try {
    const { rows: routine_activities } = await client.query(
      `
      SELECT *
      FROM routine_activities
      WHERE "routineId" = $1
    `,
      [id]
    );

    return routine_activities;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function updateRoutineActivity({ id, ...fields }) {
  try {
    const { count, duration } = fields;

    const {
      rows: [routineActivity],
    } = await client.query(
      `
      UPDATE routine_activities
      SET count = $1, duration = $2
      WHERE id = $3
      RETURNING *;
    `,
      [count, duration, id]
    );

    return routineActivity;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function destroyRoutineActivity(id) {
  try {
    const {
      rows: [routineActivity],
    } = await client.query(
      `
      DELETE FROM routine_activities
      WHERE id = $1
      RETURNING *;
    `,
      [id]
    );

    return routineActivity;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function canEditRoutineActivity(routineActivityId, userId) {
  try {
    const { routineId } = await getRoutineActivityById(routineActivityId);
    const { creatorId } = await getRoutineById(routineId);

    if (creatorId === userId) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
};
