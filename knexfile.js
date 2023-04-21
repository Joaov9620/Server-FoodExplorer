const path = require('path');

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'src', 'database', 'database.db')
    },
    pool:{
      //Habilitar a funcionalidade de deletar em cascade
     afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
   },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    useNullAsDefault: true
  }
};
