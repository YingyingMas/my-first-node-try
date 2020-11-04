const { exec } = require('../db/mysql');


const login = (username, password) => {
  // 根据用户名和密码去user表中查出当前用户
  const sql = `select username, realname from users where username='${username}' and password='${password}'`;
  // select 返回的都是一个数组，取其中的一个值即可
  return exec(sql).then(rows => {
    return rows[0] || {};
  })
}

module.exports = {
  login
}
