// api routes and endpoint names

const router = require('express').Router();
const userRoutes = require('./user-routes').Router();
const reactionRoutes = require('./thought-routes').Router();

//prefix of /users
router.use('/users', userRoutes);
router.use('/thoughts', reactionRoutes);

module.exports = router;