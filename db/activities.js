const client = require('./client');

async function getAllActivities() {
  try {
    const { rows: activities } = await client.query(`
      SELECT *
      FROM activities;
    `);

    return activities;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getActivityById(id) {
  try {
    const {
      rows: [activity],
    } = await client.query(
      `
      SELECT *
      FROM activities
      WHERE id = $1;
    `,
      [id]
    );

    return activity;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getActivityByName(name) {
  try {
    const {
      rows: [activity],
    } = await client.query(
      `
      SELECT *
      FROM activities
      WHERE name = $1;
    `,
      [name]
    );

    return activity;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// eslint-disable-next-line no-unused-vars
async function attachActivitiesToRoutines(routines) {
  try {
    const { rows: activities } = await client.query(`
    SELECT *,
    routine_activities.id AS "routineActivityId"
    FROM routine_activities
    JOIN activities
    ON activities.id = routine_activities."activityId"
    `);

    return activities;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function createActivity({ name, description }) {
  try {
    const {
      rows: [activity],
    } = await client.query(
      `
      INSERT INTO activities(name, description)
      VALUES($1, $2)
      RETURNING *;
      `,
      [name, description]
    );

    return activity;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function updateActivity({ id, ...fields }) {
  try {
    const { name, description } = fields;

    if (name && description) {
      const {
        rows: [activity],
      } = await client.query(
        `
        UPDATE activities
        SET name = $1, description = $2
        WHERE id = $3
        RETURNING *;
      `,
        [name, description, id]
      );

      return activity;
    }

    if (name) {
      const {
        rows: [activity],
      } = await client.query(
        `
        UPDATE activities
        SET name = $1
        WHERE id = $2
        RETURNING *;
      `,
        [name, id]
      );

      return activity;
    }

    if (description) {
      const {
        rows: [activity],
      } = await client.query(
        `
        UPDATE activities
        SET description = $1
        WHERE id = $2
        RETURNING *;
      `,
        [description, id]
      );

      return activity;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
};
