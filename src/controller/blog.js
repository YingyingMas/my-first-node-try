const { exec } = require('../db/mysql');

const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `;
  // where 1=1 占位置，author 和 keyword 不确定一定存在，为防止语法报错，若和面没有条件了，加上 1=1 不会报错，代码小技巧
  if (author) {
    sql += `and author='${author}' `;
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `;
  }
  sql += `order by createtime desc;`
  return exec(sql);// 返回 promise
}

const getDetail = (id) => {
  const sql = `select * from blogs where id='${id}'`;
  return exec(sql).then(rows => {
    return rows[0];
  })
}

const newBlog = (blogData = {}) => {
  // blogData 是一个博客对象，前端传来的数据，包含 title content author 属性
  const title = blogData.title;
  const content = blogData.content;
  const author = blogData.author;
  const createTime = Date.now();
  const sql = `insert into blogs (title, content, createtime, author) values ('${title}', '${content}', ${createTime}, '${author}');
`;
  return exec(sql).then(insertData => {
    // console.log('insertData is ', insertData)
    /*
    插入成功时返回的相关信息
    insertData is  OkPacket {
      fieldCount: 0,
      affectedRows: 1,
      insertId: 4,
      serverStatus: 2,
      warningCount: 0,
      message: '',
      protocol41: true,
      changedRows: 0
    }
    */
    return {
      id: insertData.insertId
    }
  })
}

const updateBlog = (id, blogData = {}) => {
  const title = blogData.title;
  const content = blogData.content;
  const sql = `update blogs set title='${title}', content='${content}' where id=${id}`;

  return exec(sql).then(updateData => {
    console.log('updateData is ', updateData)
    if (updateData.affectedRows > 0) {
      return true;//更新成功
    }
    return false;//更新失败
  })
}

const delBlog = (id, author) => {
  // 删除 用 id 和 author 来保证删除的安全性，自己只能删除自己的博客
  const sql = `delete from blogs where id='${id}' and author='${author}';`
  return exec(sql).then(delData => {
    if (delData.affectedRows > 0) {
      return true;//删除成功
    }
    return false;//删除失败
  })
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}
