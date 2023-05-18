const path = require('path');
const multer = require('multer');
const crypto = require('crypto');

const UPLOADS_FOLDER = path.resolve(__dirname, '..', '..', 'uploads');

const UPLOADS_SETTINGS = {
  storage: multer.diskStorage({
    destination: UPLOADS_FOLDER ,
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(10).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;
      return callback(null, fileName);
    },
  }),
}


const uploadImage = multer({storage: UPLOADS_SETTINGS.storage});

module.exports = {
  UPLOADS_FOLDER,
  UPLOADS_SETTINGS,
  uploadImage
}