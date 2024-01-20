module.exports = (roles) => async (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    res.send({ error: 'Access denied' });

    return;
  }

  next();
};
