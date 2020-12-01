const { login } = require('../controller/user');
const { get, set } = require('../db/redis');
const { SuccessModel, ErrorModel } = require('../model/resModel');

// 获取 cookie 的过期时间
const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000));//当前时间加上24小时
  console.log('d.toGMTString() is ', d.toGMTString());// toGMTString 转化成 cookie 对应的时间格式
  return d.toGMTString();
}

const handleUserRouter = (req, response) => {
  const method = req.method;

  // 登录
  if (method === 'POST' && req.path === '/api/user/login') {
    const { username, password } = req.body;
    const resPromise = login(username, password);
    return resPromise.then((data) => {
      // 根据 req.body 中用户传过来的账号和密码去 user 表中后去对应的 user 数据，
      // 然后将取出 username 写入 cookie，以供前端每次请求时带上此 cookie
      if (data.username) {

        //一、操作 cookie
        // response.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`)
        // 首先浏览器客户端没有任何 cookie 存在
        // 此时浏览器get请求 http://localhost:8088/api/user/login?username=lisi&password=123
        // server 端接收到参数后会通过 response.setHeader('Set-Cookie', ...) 设置 cookie 并通过 Response Headers 传送
        // 请求成功后，会在客户端看到此次请求的 Response Headers 中 会有 Set-Cookie: username=lisi; path=/; httpOnly; expires=...
        // 此时浏览器 application 查看 Cookies 会看到 存储的 cookie
        // 再一次请求接口会发现，浏览器 network 接口请求中 Request Headers 中会带有 Cookie: username=lisi; path=/; httpOnly; expires=...

        // 二、上述一直接将  sql数据直接设置在 cookie 中暴露在客户端会有用户信息安全隐患，
        //改用session，在 app.js 中将 userid 通过 response.setHeader('Set-Cookie',...) 设置在 cookie 中暴露给客户端
        // server 端通过此 userid 匹配到 user 数据，使用此 user 数据进行逻辑处理
        req.session.username = data.username;
        req.session.realname = data.realname;

        // 同步更新 Redis
        set(req.sessionId, req.session);

        return new SuccessModel();
      } else {
        return new ErrorModel('失败');
      }
    })
  }

  // 登录验证是否成功的测试接口，用login接口测试登录，登录成功后，用此接口进行登录成功后测试
  if (method === 'GET' && req.path === '/api/user/login-test') {
    // if (req.cookie.username) {
    console.log('req.session', req.session);
    // 登录验证，获取登录信息
    if (req.session.username) {
      return Promise.resolve(
        new SuccessModel({
          username: req.session.username
        })
      )
    }
    return Promise.resolve(
      new ErrorModel('尚未登录')
    )
  }
}

module.exports = handleUserRouter;
