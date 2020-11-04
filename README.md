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

## 项目目录

- 第一层：bin-www.js 创建 server，启动当前 node 服务
- 第二层：app.js 进行 server 相关统一配置，处理相应的请求，最终被引入到 www.js 中，被 createServer 时使用
- 第三层：建 src - router 文件夹，存放各个模块的路由，输出路由函数，路由函数最终被引入到app.js中被调用，当服务接收到请求后，匹配到对应的路由进行调用，传入res 和 req 参数，路由只关心路由，路由接收到参数后，从 controller 获取数据
- 建 model 文件夹， 存放数据模型，控制返回数据的一个清晰的模型，于是在路由中不会直接返回假数据，而是经过 model 包裹的数据
- 第四层：建 controller 文件夹，最关心数据的一层，被引入到路由文件中，接受参数，返回数据

## promise

- demo 中 promise 文件夹演示了 nodejs 读取文件和异步嵌套获取文件内容的过程

## api 与 路由

- api包括路由、输入、输出
- 路由：api的一部分，后端系统内部的一个定义的模块

## MySQL

- 安装 MySQL（数据库服务端）[](https://downloads.mysql.com/archives/community/)
- 安装过程中记住当时输入的 root 密码
- 安装成功后进入系统偏好设置找到 MySQL
- 进入/usr/local/mysql/bin,查看此目录下是否有mysql
- vim ~/.bash_profile 添加环境变量 export PATH=${PATH}:/usr/local/mysql/bin，使用zsh shell，编辑 ~/.zshrc 文件配置，并 source 配置文件
- 安装可视化数据库设计软件 MySQL Workbench，专为 MySQL 设计的可视化数据库建模工具[](https://downloads.mysql.com/archives/workbench/)
- 打开 Workbench，点击界面加号新建连接，输入连接相关信息，本地的话就是127.0.0.1，输入数据库密码，即安装 MySQL 时设置的密码，点击 ok 连接
- 建库，为此博客项目新建一个库，点击上方小圆柱加号，设置库名称，如 myblog，确认点击 apply，```CREATE SCHEMA `myblog` ```，继续确认 apply;
- 点击上方小sql加号，新建 sql file，输入 ```show databases;```点击小闪电运行，查看当前所有库
- 此时左侧 SCHEMAS 里面已经显示 myblog 库
- 点击展开 myblog，右击 tables 点 creat table，建 user/blog 表，输入表名，输入表column、datatype、PK(主键)、NN(不为空)、AI(自动增加)
- 修改表：右击 tables 点 alter table，删除表：右击 tables 点 drop table
- 编辑区输入 ```use myblog;``` 设置当前使用某个库
- 查看当前库所有表 ```show tables;``` ，注释使用双横杠 ```-- show tables; --```
- 向 user 表中插入数据 ```insert into users (username, `password`,  realname) values ('lisi', '123', '李四'  );```，password 为关键字，使用反引号括起来即可
- 查询所有表数据 ```select * from users;```
- 查询表某些列数据 ```select id, username from users;```
- 按条件查询表数据 ```select * from users where username = 'zhangsan' and `password` = '123';```
- 模糊查询表数据 ``` select * from users where username like '%lisi%' ```
- 查询数据排序 ```select id, username from users order by id;```，```select id, username from users order by id desc;```
- 更新表数据 ```update users set realname = '李四2' where username = 'lisi';```
- 点击运行会报错：Error Code: 1175. You are using safe update mode and you tried to update a table without a WHERE that uses a KEY column To disable safe mode, toggle the option in Preferences -> SQL Editor and reconnect.
- 运行 ```SET SQL_SAFE_UPDATES = 0``` 解决
- 删除表数据 ```delete from users where id = 4;```
- 实际工作中为预防删除数据，往往在表中增 state 列，修改 state 值为 0 或 1，软删除数据
- 如删除lisi ```update users set state = '0' where username = 'lisi';```，```select * from users where state <> '0';```
- 补充-修改表 column 名字 ```alter table blogs change column creattime createtime varchar(45);`，其中可修改内容： blogs 为表的名字，creattime 为 旧 column 名，createtime 为新 column 名，varchar(45)为新 column 类型

## 连接数据库

- 安装 ```cnpm install --save mysql```
- demo测试在 demo-mysql 文件中
- 终端运行 node index.js，后报错：Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by serv，原因：mysql8.0加密方式的原因报错。
- 解决报错：
  - 进入 mysql：```mysql -u root -p```
  - 输入mysql用户密码进入 mysql
  - 执行```use mysql;```
  - 执行```alter user 'root'@'localhost' identified with mysql_native_password by '11111111';```
  - 执行```flush privileges;```，成功过后输出 Query OK, 0 rows affected (0.07 sec)
  - 执行```quit```退出mysql
- 再次运行，数据查询数据

## 博客项目连接数据库

- 新建 src-conf-db.js，进行项目数据库连接配置
- 新建 src-db-mysql.js，创建连接，异步获取数据库数据，抛出一个函数->依据参数sql异步查询表数据返回 promise
- 修改 controller-blogs.js，编写查询 sql，调用上步函数传入 sql，抛出 promise
- 修改 router-blogs.js，取到上步抛出的 promise，.then获取查询结果并数据模型包裹后抛出，抛出此 promise，此时 router 抛出的不是假数据而是 promise
- 修改 app.js，将原本的res.end(假数据)中的假数据改为 promise.then 获取数据
- 浏览器进行 get 请求，报错，排查过程中将所有 promise 用 catch 捕捉异常，根据异常信息解决问题后请求成功
- 请求路径：[](http://localhost:8088/api/blog/list?author=lisi)
- 如上完成其他所有接口

## 登录

- 登录涉及：登录校验与登录信息存储
- cookie
  - 存储在浏览器客户端
  - 有大小限制
  - 跨域不共享
  - 字符串非结构化数据，格式：k1=v1,k2=v2,k3=vs
  - 每次发送 http 会将请求域的 cookie 发送给 server 端
  - server 端可以修改 cookie 返回给浏览器
  - 浏览器也可以修改，但是可以限制，不让js修改
  - 浏览器查看 cookie 的三种方式：1.控制台请求的 response 和 request 的 header 信息中；2.application-storage 查看；3.```document.cookie```
  - js 修改 cookie ：只能累加，不能覆盖修改，```document.cookie = 'k1=11'```
- session
- 将 session 写入 Redis
