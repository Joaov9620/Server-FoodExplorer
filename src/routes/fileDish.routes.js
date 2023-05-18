const {Router} = require('express');
const {uploadImage} = require('../configs/upload2');

const fileDishRouters = Router();

const FileDishController = require('../controllers/FileDIshController');
const fileDIshController = new FileDishController();

const ensureAuthenticated = require('../middleware/ensureAuthenticated');
const checkAdmin = require('../middleware/checkAdmin');

fileDishRouters.use(ensureAuthenticated);

fileDishRouters.post("/",checkAdmin, uploadImage.single('fileDish'), fileDIshController.upload);

module.exports = fileDishRouters;