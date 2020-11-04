const querystring = require('querystring');

// 三层：router 存放路由，处理数据，返回正确的格式，不关心数据的内容，数据的计算、筛选，只关心路由；
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

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


