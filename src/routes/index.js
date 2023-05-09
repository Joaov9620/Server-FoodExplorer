const {Router} = require('express');
const routes = Router();

const sessionsRoutes = require('./sessions.routes');
const usersRoutes = require('./users.routes');
const dishRoutes = require('./dish.routes');
const favoriteDishRoutes = require('./favoriteDish.routes');

routes.use('/sessions', sessionsRoutes);
routes.use('/users', usersRoutes);
routes.use('/dish', dishRoutes);
routes.use('/favoriteDish', favoriteDishRoutes);

module.exports = routes;