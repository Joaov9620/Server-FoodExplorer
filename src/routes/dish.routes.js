const {Router} = require('express');
const dishRouters = Router();

const ensureAuthenticated = require('../middleware/ensureAuthenticated');
const checkAdmin = require('../middleware/checkAdmin');

const DishController = require('../controllers/DishController');
const dishController = new DishController();

dishRouters.use(ensureAuthenticated);

dishRouters.get('/', dishController.index);
dishRouters.post('/',checkAdmin, dishController.create);
dishRouters.put('/:id',checkAdmin, dishController.update);
dishRouters.get('/:id', dishController.show);
dishRouters.delete('/:id', checkAdmin, dishController.delete);

module.exports = dishRouters;