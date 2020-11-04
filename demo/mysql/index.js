const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '11111111',
  port: '3306',
  database: 'myblog'
});

// 连接
con.connect();

//查询
const sql = 'select * from users';
// const sql = `update users set realname = '李四4' where username = 'lisi'`;
con.query(sql, (err, result) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(result);
});

// 结束连接
con.end();
