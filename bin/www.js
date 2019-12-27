
//一层：www.js 单独拆分出 createServer
const http = require('http');

const PORT = 8088;

const serverHandle = require('../app');//二层：app.js，系统基本设置

const server = http.createServer(serverHandle);

server.listen(PORT);
