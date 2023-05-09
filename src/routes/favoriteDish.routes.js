const {Router} = require('express');
const favoriteDishRoutes = Router();

const ensureAuthenticated = require('../middleware/ensureAuthenticated');

const FavoriteDishController = require('../controllers/FavoriteDishController');
const favoriteDishController = new FavoriteDishController();

favoriteDishRoutes.use(ensureAuthenticated);

favoriteDishRoutes.get('/', favoriteDishController.index);
favoriteDishRoutes.post('/', favoriteDishController.create);
favoriteDishRoutes.delete('/',favoriteDishController.delete);

module.exports = favoriteDishRoutes;
