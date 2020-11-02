# node-athena

## node用途

- 作为 js 运行环境
- 运行在服务器作为一个 webserver
- 作为打包构架工具

## es、js、nodejs

- es：定义语法规范，如：如何定义变量 循环 判断 函数 原型 闭包 异步等
- 前端js：js（遵循es语法规范） + web API（遵循w3c标准-dom操作、bom操作、事件绑定、ajax等）
- nodejs：js（遵循es语法规范） + nodejs API（http、fs等）

## commonjs

- nodejs 中默认的模块化规范
- Node 应用由模块组成，采用 CommonJS 模块规范
- 符合单一职责原则和开发封闭原则
- demo按理 在commonjs-demo 文件夹中

## npm init 初始化 并安装lodash工具

- demo-commonjs.js:b.js测试三方库引用和使用

## vscode debugger

- 调试入口对应package.json中的"main": "bin/www.js",
- 点击小虫子开始测试

## server端重要的几个点

- 服务的稳定性：不能挂，pm2 进程守候（进程挂掉后自己重启）
- 内存和CPU：stream 写日志节约内存，Redis 存 session 扩展
- 日志记录：记录、存储、分析
- 安全：越权操作，数据库攻击，预防 xss 攻击，sql 注入
- 集群和服务：如何应对流量过大的问题

## 此项目开发的内容

- 以学习为目的开发一个具备博客基础功能的博客系统
- 课程最终目标学会如何使用nodejs开发webserver
- 不用框架开发
- 用 express 开发
- 用 koa2 开发
- 主要功能：首页-显示所有博客列表，作者页，博客详情页，登录页，管理中心-编辑/新建页(标题和正文)

## 技术方案

- 数据如何存储（博客、用户）- 设计表
- 接口设计

## 接口开发

- nodejs 处理 http 请求
- 搭建开发环境
- 开发接口（暂不连接数据库，不考虑登录）
- get 请求与 querystring
- post 请求与 postdata
- 路由
- 实例：demo-http-app.js
- node app.js 运行
- 浏览器访问 localhost:8000 进行get请求
- postman 测试 post请求

## 环境搭建

- 安装 nodemon 自动重启
- 安装 cross-env 设置环境变量兼容不同系统环境