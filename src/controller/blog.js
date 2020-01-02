const getList = (author, keyword) => {
  return [
    {
      id: author,
      title: keyword
    },
    {
      id: 2,
      title: 43
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
      title: ''
    }
  ]
}

const newBlog = (blogData = {}) => {
  return {
    id: 3//新建之后插入到数据表里面的id
  }
}

const updateBlog = (id, blogData = {}) => {
  console.log('更新的博客的' + id);
  console.log(blogData);
  return true;//更新成功

}

const delBlog = (id, author) => {
  console.log('删除的博客的' + id);
  return false;//删除成功
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}
