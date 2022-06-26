const express = require('express');
const router = express.Router();

const { requireLogin } = require('./utils');
const {
  getRoutineActivityById,
  getRoutineById,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
} = require('../db');

// PATCH /api/routine_activities/:routineActivityId
router.patch('/:routineActivityId', requireLogin, async (req, res, next) => {
  try {
    const { routineActivityId } = req.params;
    const { count, duration } = req.body;
    const { id, username } = req.user;
    const fields = { id: routineActivityId, count, duration };

    const { routineId } = await getRoutineActivityById(routineActivityId);
    const { name } = await getRoutineById(routineId);
    const canEdit = await canEditRoutineActivity(routineActivityId, id);

    if (canEdit) {
      const routineActivity = await updateRoutineActivity(fields);

      res.send(routineActivity);
    } else {
      res.send({
        message: `User ${username} is not allowed to update ${name}`,
        name: 'UnauthorizedUpdateError',
        error: 'Routine can only be updated by creator',
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// DELETE /api/routine_activities/:routineActivityId
router.delete('/:routineActivityId', requireLogin, async (req, res, next) => {
  const { routineActivityId } = req.params;
  const { id, username } = req.user;

  try {
    const { routineId } = await getRoutineActivityById(routineActivityId);
    const { name } = await getRoutineById(routineId);
    const canEdit = await canEditRoutineActivity(routineActivityId, id);

    if (canEdit) {
      const routineActivity = await destroyRoutineActivity(routineActivityId);

      res.send(routineActivity);
    } else {
      res.status(403).send({
        message: `User ${username} is not allowed to delete ${name}`,
        name: 'UnauthorizedDeleteError',
        error: 'Routine can only be deleted by creator',
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = router;
