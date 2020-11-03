const getList = (author, keyword) => {
  return [
    {
      id: author,
      title: keyword
    },
    {
      id: 2,
      title: '测试getList接口'
    },
    {
      id: 3,
      title: 5656
    }
  ]
}

const getDetail = (id) => {
  return [
    {
      id: id,
      title: '测试getDetail接口'
    }
  ]
}

const newBlog = (blogData = {}) => {
  console.log('newBlog-reqbody', blogData);
  return {
    id: 3//新建之后插入到数据表里面的id
  }
}

const updateBlog = (id, blogData = {}) => {
  console.log('更新的博客的id' + id);
  console.log('updateBlog-reqbody', blogData);
  return true;//更新成功
}

const delBlog = (id, author) => {
  console.log('删除的博客的id' + id);
  return true;//删除成功
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}
