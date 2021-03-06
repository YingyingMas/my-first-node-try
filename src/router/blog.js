
const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog');// 四层 controller 只关心数据
const { SuccessModel, ErrorModel } = require('../model/resModel');

//API前端后端对接，不通系统对接的一个术语；包含url（路由） 输入 输出
//路由：/api/blog/list，API的一部分，后端系统内部的一个模块，实现的的一个层次，系统中分了很多模块，如router-controler--

// 抽离统一的登录验证功能，很多路由都需要进行登录验证
const loginCheck = (req) => {
  if (!req.session.username) {
    return Promise.resolve(new ErrorModel('尚未登录'));
  }
}

const handleBlogRouter = (req, res) => {
  const method = req.method;
  console.log(req.path);
  // 获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    //登录验证 loginCheck 若为登录则返回提示信息，若登录则默认返回 false
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      return loginCheckResult;
    }

    let author = req.query.author || '';// 查询条件：依据 author 查询
    const keyword = req.query.keyword || '';// 查询条件：依据 keyword 查询

    if (req.query.isadmin) {
      const loginCheckResult = loginCheck(req);// 管理员界面
      if (loginCheckResult) {
        return loginCheckResult;// 未登录
      }
      author = req.session.username;// 强制查询自己的博客
    }

    const resultPromise = getList(author, keyword);
    return resultPromise.then(listData => {
      return new SuccessModel(listData);
    })
  }

  // 获取博客详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    //登录验证 loginCheck 若为登录则返回提示信息，若登录则默认返回 false
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      return loginCheckResult;
    }

    const id = req.query.id;// 查询条件：博客 id
    const resultPromise = getDetail(id);
    return resultPromise.then(data => {
      return new SuccessModel(data);
    })
  }

  // 新建一篇博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    //登录验证 loginCheck 若为登录则返回提示信息，若登录则默认返回 false
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      return loginCheckResult;
    }

    req.body.author = req.session.username;
    const resultPromise = newBlog(req.body);
    return resultPromise.then(data => {
      return new SuccessModel(data);
    })
  }

  // 更新一篇博客
  if (method === 'POST' && req.path === '/api/blog/update') {
    //登录验证 loginCheck 若为登录则返回提示信息，若登录则默认返回 false
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      return loginCheckResult;
    }

    const id = req.query.id;
    const resultPromise = updateBlog(id, req.body);//传入id和要更新的内容
    return resultPromise.then(val => {
      // val 即 controller 中返回的 true 或者 false
      if (val) {
        return new SuccessModel();
      } else {
        return new ErrorModel('更新博客失败');
      }
    })
  }

  // 删除一篇博客，实际开发中建议软删除
  if (method === 'POST' && req.path === '/api/blog/del') {
    //登录验证 loginCheck 若为登录则返回提示信息，若登录则默认返回 false
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      return loginCheckResult;
    }

    const id = req.query.id;
    const author = req.session.username;
    const resultPromise = delBlog(id, author);
    return resultPromise.then(val => {
      if (val) {
        return new SuccessModel();
      } else {
        return new ErrorModel('删除失败');
      }
    })
  }
}

module.exports = handleBlogRouter;
