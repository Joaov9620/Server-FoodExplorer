const fs = require('fs');  //trabalhar e manipular arquivos
const path = require('path');
// const upLoadConfig = require('../configs/upload');
const upLoadConfig = require('../configs/upload2');

class DiskStorage{
    async saveFile(file){
        return file;       
    }

    async deleteFile(file){
        const filePath = path.resolve(upLoadConfig.UPLOADS_FOLDER, file);
        try{
            await fs.promises.stat(filePath);
        }catch{
            return;
        }
        await fs.promises.unlink(filePath);
    }
};

module.exports = DiskStorage;