const AppError = require('../utils/AppError');

function checkAdmin(req, res, next) {
  const isAdmin = req.user.isAdmin;
  
  if(isAdmin === false){
    throw new AppError('Acesso negado: apenas funcionários ou Admin têm acesso', 403)
  };

  next();
}
  
module.exports = checkAdmin;

