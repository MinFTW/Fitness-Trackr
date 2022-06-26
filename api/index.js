const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;
const { getUserById } = require('../db');

router.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

// GET /api/health
router.get('/health', (req, res) => {
  res.send({ message: 'All is well' });
});

// ROUTER: /api/users
router.use('/users', require('./users'));

// ROUTER: /api/activities
router.use('/activities', require('./activities'));

// ROUTER: /api/routines
router.use('/routines', require('./routines'));

// ROUTER: /api/routine_activities
router.use('/routine_activities', require('./routineActivities'));

router.use('*', (req, res) => {
  res.status(404).send({ message: 'Page not found' });
});

router.use((error, req, res) => {
  res.send({
    name: error.name,
    message: error.message,
  });
});

module.exports = router;
