const client = require('./client');

async function getRoutineActivityById(id) {
  try {
    const {
      rows: [routine_activity],
    } = await client.query(
      `
      SELECT *
      FROM routine_activities
      WHERE id = $1;
    `,
      [id]
    );

    return routine_activity;
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
      rows: [routine_activity],
    } = await client.query(
      `
      INSERT INTO routine_activities("routineId", "activityId", count, duration)
      VALUES($1, $2, $3, $4)
      RETURNING *;
    `,
      [routineId, activityId, count, duration]
    );

    return routine_activity;
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
  const { count, duration } = fields;

  try {
    const {
      rows: [routine_activity],
    } = await client.query(
      `
      UPDATE routine_activities
      SET count = $1, duration = $2
      WHERE id = $3
      RETURNING *;
    `,
      [count, duration, id]
    );

    return routine_activity;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function destroyRoutineActivity(id) {
  try {
    const {
      rows: [routine_activity],
    } = await client.query(
      `
      DELETE FROM routine_activities
      WHERE id = $1
      RETURNING *;
    `,
      [id]
    );

    return routine_activity;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function canEditRoutineActivity(routineActivityId, userId) {
  try {
    const {
      rows: [routine_activity],
    } = await client.query(
      `
      SELECT *
      FROM routine_activities
      WHERE id = $1
    `,
      [routineActivityId]
    );

    const {
      rows: [creator],
    } = await client.query(
      `
      SELECT *
      FROM routines
      WHERE "creatorId" = $1
    `,
      [userId]
    );

  if (routine_activity && creator) return true;

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
