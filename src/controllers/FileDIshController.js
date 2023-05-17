const knex = require('../database');
const AppError = require('../utils/AppError');
const DiskStorage = require('../providers/DiskStorage');

class FileDishController{
    async update(req, res){
        const id = req.params.id;
        const dishFileName = req.file.filename; 
        const diskStorage = new DiskStorage();

        const dish = await knex('dish')
        .where({id }).first();
          
        if(!dish){
            throw new AppError("Prato não encontrado!");
        }

        if(dish.img){
            await diskStorage.deleteFile(dish.img);
        }

        const filename = await diskStorage.saveFile(dishFileName);
        dish.img = filename;

        await knex('dish').update(dish).where({id});

        return res.json(dish);  
    }
}

module.exports = FileDishController;