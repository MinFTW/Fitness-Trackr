const client = require('./client');
const bcrypt = require('bcrypt');

async function createUser({ username, password }) {
  try {
    const SALT_COUNT = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO users(username, password)
      VALUES($1, $2)
      ON CONFLICT (username) DO NOTHING
      RETURNING *;
    `,
      [username, hashedPassword]
    );

    if (user) delete user.password;

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getUser({ username, password }) {
  const user = await getUserByUsername(username);
  const hashedPassword = user.password;
  const passwordsMatch = await bcrypt.compare(password, hashedPassword);

  if (passwordsMatch) {
    try {
      const {
        rows: [user],
      } = await client.query(
        `
        SELECT id, username
        FROM users
        WHERE username = $1
      `,
        [username]
      );

      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT id, username
      FROM users
      WHERE id = $1;
    `,
      [userId]
    );

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getUserByUsername(userName) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT *
      FROM users
      WHERE username = $1;
    `,
      [userName]
    );

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
};
