const knex = require('../database');
const AppError = require('../utils/AppError');
const DiskStorage = require('../providers/DiskStorage');
const { UPLOADS_FOLDER } = require('../configs/upload2');

class FileDishController{
    async update(req, res){
       try{
        const id = req.params.id;
        
        const dishFileName = req.file.filename; 
        console.log(dishFileName)

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
       }catch(error){
         return res.status(500).json(error)
       }
    }

    async upload(req, res) {
      if (!req.file) {
        return res.status(400).json({ error: 'Nenhuma imagem enviada' });
      }
    
      // const imagePath = `${UPLOADS_FOLDER}/${req.file.filename}`; --caso quiser retornar com o caminho completo
      const imagePath = `${req.file.filename}`;
      return res.status(200).json({ imagePath });
    }
}

module.exports = FileDishController;