const {Router} = require('express');
const multer = require('multer');
const upLoadConfig = require('../configs/upload');  

const dishRouters = Router();
const upload= multer(upLoadConfig.MULTER);

const ensureAuthenticated = require('../middleware/ensureAuthenticated');
const checkAdmin = require('../middleware/checkAdmin');

const DishController = require('../controllers/DishController');
const dishController = new DishController();

dishRouters.use(ensureAuthenticated);

dishRouters.get('/', checkAdmin,dishController.index);
dishRouters.patch('/fileDish', upload.single('fileDish'), (req, res) =>{
    console.log(req.file.filename);
    res.json();
});
dishRouters.post('/',checkAdmin, dishController.create);
dishRouters.put('/:id',checkAdmin, dishController.update);
dishRouters.get('/:id', dishController.show);
dishRouters.delete('/:id', checkAdmin, dishController.delete);

module.exports = dishRouters;