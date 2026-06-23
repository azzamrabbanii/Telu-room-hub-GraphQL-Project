const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'db',             
  user: 'root',
  password: '',
  database: 'telu_room_hub_eai',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const db = pool.promise();

module.exports = db;