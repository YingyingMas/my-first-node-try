const mysql = require('mysql');

const { MYSQL_CONF } = require('../conf/db');

const con = mysql.createConnection(MYSQL_CONF);

con.connect();
function exec (sql, fn) {
  return new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    })
  })

}
// const sql = 'select * from users';
// exec(sql).then(result => {
//   console.log(result);
// })
// con.end();
module.exports = { exec };