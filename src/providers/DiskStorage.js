const fs = require('fs');  //trabalhar e manipular arquivos
const path = require('path');
const upLoadConfig = require('../configs/upload');

class DiskStorage{
    async saveFile(file){
        await fs.promises.rename(
            path.resolve(upLoadConfig.TMP_FOLDER, file),
            path.resolve(upLoadConfig.UPLOADS_FOLDER, file)
        )
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