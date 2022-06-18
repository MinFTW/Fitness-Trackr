const client = require('./client');

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
    const {
      rows: [routines],
    } = await client.query(`
      SELECT *
      FROM routines;
    `);

    return routines;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getAllRoutines() {}

async function getAllRoutinesByUser({ username }) {}

async function getPublicRoutinesByUser({ username }) {}

async function getAllPublicRoutines() {}

async function getPublicRoutinesByActivity({ id }) {}

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
  // console.log(fields); // isPublic, name, goal
  const { isPublic, name, goal } = fields;

  // try {
  //   const { rows: [routine] } = await client.query(`
  //     UPDATE routines
  //     SET 
  //     WHERE id = $1
  //     RETURNING *;
  //   `, [id])

  //   return routine;
  // } catch (error) {
  //   console.log(error);
  //   throw error;
  // }

}

async function destroyRoutine(id) {
  try {
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
