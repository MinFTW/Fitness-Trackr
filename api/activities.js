const express = require('express');
const router = express.Router();

const {
  getAllActivities,
  createActivity,
  getActivityByName,
  getActivityById,
  updateActivity,
  getPublicRoutinesByActivity,
} = require('../db');

const { requireLogin } = require('./utils');

// GET /api/activities/:activityId/routines
router.get('/:activityId/routines', async (req, res, next) => {
  try {
    const id = req.params.activityId;
    const activity = { id: id };
    const routines = await getPublicRoutinesByActivity(activity);

    if (routines.length === 0)
      res.send({
        message: `Activity ${id} not found`,
        name: 'ActivityDoesNotExistError',
        error: 'Activity does not exist',
      });

    res.send(routines);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// GET /api/activities
router.get('/', async (req, res, next) => {
  try {
    const activities = await getAllActivities();

    res.send(activities);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// POST /api/activities
router.post('/', requireLogin, async (req, res, next) => {
  const { name, description } = req.body;

  try {
    const checkActivity = await getActivityByName(name);

    if (checkActivity) {
      res.send({
        message: `An activity with name ${name} already exists`,
        name: 'ActivityAlreadyExistsError',
        error: 'Activity already exists',
      });
    } else {
      const activity = await createActivity({ name, description });

      res.send(activity);
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// PATCH /api/activities/:activityId
router.patch('/:activityId', async (req, res, next) => {
  const id = req.params.activityId;
  const { name, description } = req.body;

  try {
    const checkActivityId = await getActivityById(id);

    if (!checkActivityId)
      res.send({
        message: `Activity ${id} not found`,
        name: 'ActivityNotFoundError',
        error: 'Activity does not exist',
      });

    const checkActivityName = await getActivityByName(name);

    if (checkActivityName) {
      res.send({
        message: `An activity with name ${name} already exists`,
        name: 'ActivityAlreadyExistsError',
        error: 'Activity already exists',
      });
    } else {
      const activity = await updateActivity({ id, name, description });

      res.send(activity);
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = router;
