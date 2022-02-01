const mysql = require('mysql2');
class Database {
  getConnection() {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Tucsonero,2010',
      database: 'evaluacion3.3'
    });
    return connection;
  }
}
module.exports = Database;


