const fs = require('fs');
const path = require('path');

const fileName = path.resolve(__dirname, 'data.txt');//拼接路径

// 读取文件内容
fs.readFile(fileName, (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data.toString());// data 是二进制类型，需要转换为字符串
});

// 写入文件
const content = '这是新写入的内容\n';
const opt = {
  flag: 'a'  // 追加写入。覆盖用 'w'
};
fs.writeFile(fileName, content, opt, (err) => {
  if (err) {
    console.error(err);
  }
});

// 判断文件是否存在
fs.exists(fileName, (exist) => {
  console.log('exist', exist)
});

// 基本上文件操作均为异步操作
// 若文件内容或写入内容非常大，则十分耗性能