const requireLogin = (req, res, next) => {
  if (!req.user) {
    res.status(401).send({
      message: 'You must be logged in to perform this action',
      name: 'UnauthorizedUserError',
      error: 'Not logged in',
    });
  }

  next();
};

module.exports = { requireLogin };
