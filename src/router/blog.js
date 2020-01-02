const {getList, getDetail, newBlog, updateBlog, delBlog} = require('../controller/blog');// 四层 controller 只关心数据
const {SuccessModel, ErrorModel} = require('../model/resModel');


const handleBlogRouter = (req, res) => {
  const method = req.method;
  console.log(req.path);
  // 获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    let author = req.query.author || '';
    const keyword = req.query.keyword || '';
    const listData = getList(author, keyword);
    return new SuccessModel(listData);
  }

  // 获取博客详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    const id = req.query.id;
    const data = getDetail(id)
    return new SuccessModel(data)
  }

  // 新建一篇博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    const data = newBlog(req.body)
    return new SuccessModel(data)
  }

  // 更新一篇博客
  if (method === 'POST' && req.path === '/api/blog/update') {
    const id = req.query.id;
    const res = updateBlog(id, req.body)
    if (res) {
      return new SuccessModel();
    } else {
      return new ErrorModel('更新失败');
    }
  }

  // 删除一篇博客
  if (method === 'POST' && req.path === '/api/blog/del') {
    const id = req.query.id;
    const res = delBlog(id, req.body)
    if (res) {
      return new SuccessModel();
    } else {
      return new ErrorModel('删除失败');
    }
  }
}

module.exports = handleBlogRouter;
