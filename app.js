const querystring = require('querystring');

// 三层：router 存放路由，处理数据，返回正确的格式，不关心数据的内容，数据的计算、筛选，只关心路由；
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

// // 存放所有 session 数据
const SESSION_DATA = {}

// 获取 cookie 的过期时间
const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000));//当前时间加上24小时
  console.log('d.toGMTString() is ', d.toGMTString());// toGMTString 转化成 cookie 对应的时间格式
  return d.toGMTString();
}

// 处理postData
const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({});
      return false;
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({});
      return false;
    }
    let postData = '';
    req.on('data', chunk => {
      postData += chunk.toString();
    });
    req.on('end', () => {
      if (!postData) {
        resolve({});
        return false;
      }
      resolve(JSON.parse(postData));
    });
  })
  return promise;
};

const serverHandle = (req, res) => {
  // 设置返回格式 JSON
  res.setHeader('Content-type', 'application/json');

  // 获取 path
  const url = req.url;
  req.path = url.split('?')[0];

  // nodejs 原生模块 querystring 解析 query
  req.query = querystring.parse(url.split('?')[1]);

  // 解析 cookie
  req.cookie = {}
  const cookieStr = req.headers.cookie || ''  // k1=v1;k2=v2;k3=v3
  cookieStr.split(';').forEach(item => {
    if (!item) {
      return;
    }
    const arr = item.split('=');
    const key = arr[0] && arr[0].trim();
    const val = arr[1] && arr[1].trim();
    req.cookie[key] = val;
  })

  // 解析 session
  let needSetCookie = false;//控制是否需要设置 cookie，没有取到 userId 就需要设置 cookie
  let userId = req.cookie.userid;
  // 如果从客户端 cookie 中取到 userId，且 SESSION_DATA 中有此 userId，则直接将值赋值给 req.session，若 SESSION_DATA 中没有此 userid，则新增一个此 userid 键，值为空{}，将{}赋值给 req.session
  // 如果没有从客户端 cookie 中取到 userId，则新建一个 userid，并通过 Set-Cookie 将此 userid 设置为 cookie，并新增一个此 userid 键，值为空{}，，将{}赋值给 req.session
  // 用户在登录的时候，server 端依据登录参数，sql查询到数据，并将数据写入 req.session
  if (userId) {
    if (!SESSION_DATA[userId]) {
      SESSION_DATA[userId] = {}
    }
  } else {
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`;
    SESSION_DATA[userId] = {};
  }
  req.session = SESSION_DATA[userId]


  // 异步处理 postdata，接收完成后将参数放入请求体
  getPostData(req).then((postdata) => {
    req.body = postdata;

    // 处理 blog 路由
    // const blogData = handleBlogRouter(req, res);
    // if (blogData) {
    //   res.end(JSON.stringify(blogData));
    //   return;
    // }
    const blogDataPromise = handleBlogRouter(req, res);
    if (blogDataPromise) {
      blogDataPromise.then(blogData => {
        if (blogData) {
          if (needSetCookie) {
            res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`);
          }
          res.end(JSON.stringify(blogData));
        }
      })
      return;
    }

    // 处理 user 路由
    const userDataPromise = handleUserRouter(req, res);
    if (userDataPromise) {
      userDataPromise.then(userData => {
        if (userData) {
          if (needSetCookie) {
            res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`);
          }
          res.end(JSON.stringify(userData));
        }
      }).catch((err) => {
        console.log(err);
      })
      return;
    }

    // 未命中路由，返回 404
    res.writeHead(404, { "Content-type": "text/plain" });
    res.write("404 Not Found\n");
    res.end();
  })


};

module.exports = serverHandle;


