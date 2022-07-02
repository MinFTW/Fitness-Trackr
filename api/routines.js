const express = require('express');
const router = express.Router();

const { requireLogin } = require('./utils');
const {
  getAllRoutines,
  createRoutine,
  updateRoutine,
  getRoutineById,
  destroyRoutine,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
} = require('../db');

// GET /api/routines
router.get('/', async (req, res, next) => {
  try {
    const routines = await getAllRoutines();

    res.send(routines);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// POST /api/routines
router.post('/', requireLogin, async (req, res, next) => {
  try {
    const creatorId = req.user.id;
    const { isPublic, name, goal } = req.body;
    const newRoutine = { creatorId, isPublic, name, goal };
    const routine = await createRoutine(newRoutine);

    res.send(routine);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// PATCH /api/routines/:routineId
router.patch('/:routineId', requireLogin, async (req, res, next) => {
  try {
    const { routineId } = req.params;
    const { id, username } = req.user;
    const { isPublic, name, goal } = req.body;
    const newRoutine = { id: routineId, isPublic, name, goal };

    const originalRoutine = await getRoutineById(routineId);
    const originalName = originalRoutine.name;

    if (originalRoutine.creatorId === id) {
      const routine = await updateRoutine(newRoutine);

      res.send(routine);
    } else {
      res.status(403).send({
        message: `User ${username} is not allowed to update ${originalName}`,
        name: 'UnauthorizedUpdateError',
        error: 'User not allowed to update routine',
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// DELETE /api/routines/:routineId
router.delete('/:routineId', requireLogin, async (req, res, next) => {
  try {
    const { routineId } = req.params;
    const { id, username } = req.user;

    const routine = await getRoutineById(routineId);
    const name = routine.name;

    if (routine.creatorId === id) {
      const deletedRoutine = await destroyRoutine(routineId);

      res.send(deletedRoutine);
    } else {
      res.status(403).send({
        message: `User ${username} is not allowed to delete ${name}`,
        name: 'UnauthorizedDeleteError',
        error: 'User not allowed to delete routine',
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// POST /api/routines/:routineId/activities
router.post('/:routineId/activities', requireLogin, async (req, res, next) => {
  try {
    const { routineId } = req.params;
    const { activityId, count, duration } = req.body;
    const activity = { routineId, activityId, count, duration };

    const routine = await getRoutineById(routineId);
    const [routineActivities] = await getRoutineActivitiesByRoutine(routine);

    if (
      !routineActivities ||
      routineActivities.activityId !== activity.activityId
    ) {
      const routineActivity = await addActivityToRoutine(activity);

      res.send(routineActivity);
    } else {
      res.send({
        message: `Activity ID ${activityId} already exists in Routine ID ${routineId}`,
        name: 'DuplicateEntryError',
        error: 'Activity already exists in routine',
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = router;
