
//一层：www.js 单独拆分出 createServer，仅仅技术相关的基本功能
const http = require('http');

const PORT = 8000;

const serverHandle = require('../app');//二层：app.js，系统基本设置，业务相关配置

const server = http.createServer(serverHandle);

server.listen(PORT);
