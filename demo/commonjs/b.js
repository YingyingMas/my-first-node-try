const { fun1, fun2 } = require('./a.js');
const _ = require('lodash');
console.log(fun1(2, 3));
console.log(fun2(2, 3));
console.log(_.concat([1,2],[3,4]));
// 执行 node b.js 输出打印结果