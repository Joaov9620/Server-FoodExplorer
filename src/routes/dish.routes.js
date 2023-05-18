const {Router} = require('express');
const multer = require('multer');
// const upLoadConfig = require('../configs/upload'); 
// const upload= multer(upLoadConfig.MULTER); 
const {uploadImage} = require('../configs/upload2');

const dishRouters = Router();

const ensureAuthenticated = require('../middleware/ensureAuthenticated');
const checkAdmin = require('../middleware/checkAdmin');

const DishController = require('../controllers/DishController');
const dishController = new DishController();
const FileDishController = require('../controllers/FileDIshController');
const fileDIshController = new FileDishController();

dishRouters.use(ensureAuthenticated);

dishRouters.get('/', checkAdmin, dishController.index);
dishRouters.post("/", uploadImage.single('fileDish'), dishController.create);
dishRouters.patch('/fileDish/:id', uploadImage.single('fileDish'), fileDIshController.update);
dishRouters.put('/:id',checkAdmin, dishController.update);
dishRouters.get('/:id', dishController.show);
dishRouters.delete('/:id', checkAdmin, dishController.delete);

module.exports = dishRouters;