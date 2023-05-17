const {Router} = require('express');
const multer = require('multer');
const upLoadConfig = require('../configs/upload');  

const dishRouters = Router();
const upload= multer(upLoadConfig.MULTER);

const ensureAuthenticated = require('../middleware/ensureAuthenticated');
const checkAdmin = require('../middleware/checkAdmin');

const DishController = require('../controllers/DishController');
const FileDishController = require('../controllers/FileDIshController');
const dishController = new DishController();
const fileDIshController = new FileDishController();

dishRouters.use(ensureAuthenticated);

dishRouters.get('/', checkAdmin,dishController.index);
dishRouters.patch('/fileDish/:id', upload.single('fileDish'), fileDIshController.update);
dishRouters.post('/',checkAdmin, dishController.create);
dishRouters.put('/:id',checkAdmin, dishController.update);
dishRouters.get('/:id', dishController.show);
dishRouters.delete('/:id', checkAdmin, dishController.delete);

module.exports = dishRouters;