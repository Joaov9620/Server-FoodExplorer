const fs = require('fs');  //trabalhar e manipular arquivos
const path = require('path');
const upLoadConfig = require('../configs/upload2');

class DiskStorage{
    async saveFile(file){
        return file;       
    }

    async deleteFile(file){
        const filePath = path.resolve(upLoadConfig.UPLOADS_FOLDER, file);
        try{
            await fs.promises.stat(filePath);
            await fs.promises.unlink(filePath);
        }catch{
            return;
        }     
    }
};

module.exports = DiskStorage;