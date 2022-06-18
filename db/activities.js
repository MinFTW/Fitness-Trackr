const client = require('./client');

// database functions
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

// async function attachActivitiesToRoutines(routines) {}
// select and return an array of all activities

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
// return the new activity

async function updateActivity({ id, ...fields }) {
  const { name, description } = fields;

  try {
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
// don't try to update the id
// do update the name and description
// return the updated activity

module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  // attachActivitiesToRoutines,
  createActivity,
  updateActivity,
};
