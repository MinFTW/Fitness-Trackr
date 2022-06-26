const client = require('./client');
const { filterActivities } = require('./utils');

async function getRoutineById(id) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
      SELECT *
      FROM routines
      WHERE id = $1
    `,
      [id]
    );

    return routine;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getRoutinesWithoutActivities() {
  try {
    const { rows: routines } = await client.query(`
    SELECT routines.*,
    users.username AS "creatorName"
    FROM routines
    JOIN users
    ON routines."creatorId" = users.id;
    `);

    return routines;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getAllRoutines() {
  try {
    const routines = await getRoutinesWithoutActivities();
    const result = await filterActivities(routines);

    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getAllRoutinesByUser({ username }) {
  try {
    const { rows: routines } = await client.query(
      `
    SELECT routines.*,
    users.username AS "creatorName"
    FROM routines
    JOIN users
    ON routines."creatorId" = users.id
    WHERE users.username = $1;
    `,
      [username]
    );

    const result = await filterActivities(routines);

    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getPublicRoutinesByUser({ username }) {
  try {
    const { rows: routines } = await client.query(
      `
    SELECT routines.*,
    users.username AS "creatorName"
    FROM routines
    JOIN users
    ON routines."creatorId" = users.id
    WHERE users.username = $1 
    AND 
    "isPublic" = true;
    `,
      [username]
    );

    const result = await filterActivities(routines);

    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getAllPublicRoutines() {
  try {
    const { rows: routines } = await client.query(`
    SELECT routines.*,
    users.username AS "creatorName"
    FROM routines
    JOIN users
    ON routines."creatorId" = users.id
    WHERE "isPublic" = true;
    `);

    const result = await filterActivities(routines);

    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getPublicRoutinesByActivity({ id }) {
  try {
    const { rows: routines } = await client.query(
      `
    SELECT routines.*,
    users.username AS "creatorName"
    FROM routines
    JOIN users
    ON routines."creatorId" = users.id
    JOIN routine_activities
    ON routine_activities."routineId" = routines.id
    JOIN activities
    ON activities.id = routine_activities."activityId"
    WHERE "isPublic" = true
    AND
    "activityId" = $1;
    `,
      [id]
    );

    const result = await filterActivities(routines);

    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function createRoutine({ creatorId, isPublic, name, goal }) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
      INSERT INTO routines("creatorId", "isPublic", name, goal)
      VALUES($1, $2, $3, $4)
      ON CONFLICT (name) DO NOTHING
      RETURNING *;
    `,
      [creatorId, isPublic, name, goal]
    );

    return routine;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function updateRoutine({ id, ...fields }) {
  try {
    const setString = Object.keys(fields)
      .map((key, index) => `"${key}" = $${index + 2}`)
      .join(', ');

    if (setString.length > 0) {
      const {
        rows: [routine],
      } = await client.query(
        `
      UPDATE routines
      SET ${setString}
      WHERE id = $1
      RETURNING *;
        `,
        [id, ...Object.values(fields)]
      );

      return routine;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function destroyRoutine(id) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
      SELECT *
      FROM routines
      WHERE id = $1
    `,
      [id]
    );

    await client.query(
      `
    DELETE FROM routine_activities
    WHERE "routineId" = $1
    RETURNING *;
    `,
      [id]
    );

    await client.query(
      `
    DELETE FROM routines
    WHERE id = $1
    RETURNING *;
  `,
      [id]
    );

    return routine;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
};
