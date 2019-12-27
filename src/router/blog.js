
const {getList} = require('../controller/blog');// 四层 controller 只关心数据
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
    return {
      msg: '获取博客详情'
    }
  }

  // 新建一篇博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    return {
      msg: '新建一篇博客'
    }
  }

  // 更新一篇博客
  if (method === 'POST' && req.path === '/api/blog/update') {
    return {
      msg: '更新一篇博客'
    }
  }

  // 删除一篇博客
  if (method === 'POST' && req.path === '/api/blog/del') {
    return {
      msg: '删除一篇博客'
    }
  }
}

module.exports = handleBlogRouter;
