const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { requireLogin } = require('./utils');
const {
  getUserByUsername,
  createUser,
  getUserById,
  getPublicRoutinesByUser,
} = require('../db');

// POST /api/users/login
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      next({
        name: 'MissingCredentialsError',
        message: 'Please supply both a username and password',
      });
    }

    const user = await getUserByUsername(username);
    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);

    if (passwordsMatch) {
      const token = jwt.sign(
        { id: user.id, username },
        process.env.JWT_SECRET,
        {
          expiresIn: '1w',
        }
      );

      res.send({ message: `you're logged in!`, user, token: `${token}` });
    } else {
      next({
        name: 'IncorrectCredentialsError',
        message: 'Username or password is incorrect',
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// POST /api/users/register
router.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (password.length < 8) {
      res.send({
        message: 'Password Too Short!',
        name: 'PasswordTooShortError',
        error: 'Passwords need to be at least 8 characters',
      });
    }

    const _user = await getUserByUsername(username);

    if (_user) {
      res.send({
        message: `User ${username} is already taken.`,
        name: 'PasswordTooShortError',
        error: 'Username already exists',
      });
    }

    const user = await createUser({ username, password });

    const token = jwt.sign(
      {
        id: user.id,
        username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1w',
      }
    );

    res.send({ message: 'Thanks for signing up!', user, token });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// GET /api/users/me
router.get('/me', requireLogin, async (req, res, next) => {
  try {
    const user = await getUserById(req.user.id);

    res.send(user);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// GET /api/users/:username/routines
router.get('/:username/routines', async (req, res, next) => {
  const username = { username: req.params.username };

  try {
    const routines = await getPublicRoutinesByUser(username);

    res.send(routines);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = router;
