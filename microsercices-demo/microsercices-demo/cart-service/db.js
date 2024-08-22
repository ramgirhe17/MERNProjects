const mysql = require('mysql2')

const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  database: 'cart_service_db',
  user: 'root',
  password: 'ramgirhe',
})

module.exports = {
  pool,
}
