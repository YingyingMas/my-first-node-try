
const {getList, getDetail, newBlog, updateBlog, delBlog} = require('../controller/blog');// 四层 controller 只关心数据
const {SuccessModel, ErrorModel} = require('../model/resModel');

//API前端后端对接，不通系统对接的一个术语；包含url（路由） 输入 输出
//路由：/api/blog/list，API的一部分，后端系统内部的一个模块，实现的的一个层次，系统中分了很多模块，如router-controler--

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
    const data = getDetail(id);
    return new SuccessModel(data)
  }

  // 新建一篇博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    const data = newBlog(req.body);
    return new SuccessModel(data);
  }

  // 更新一篇博客
  if (method === 'POST' && req.path === '/api/blog/update') {
    const id = req.query.id;
    const res = updateBlog(id, req.body);
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
