const fs = require('fs');
const path = require('path');

// path.resolve 方法拼接文件名
// 参数一：__dirname 当前文件的目录
// 参数二：所在文件夹名
// 参数三：文件名
// fullFileName 得到该文件在电脑中的绝对路径
const fullFileName = path.resolve(__dirname, 'files', 'a.json');

// fs.readFile 读取文件，是异步操作，
fs.readFile(fullFileName, (err, data) => {
  if (err) {
    console.log(err);
  }
  // data 是二进制格式，toString 转为字符串
  console.log('chu', data.toString());
})

// 执行 index.js，输出 a.json 文件内容


// 将上述封装一个一层一层异步获取文件内容的函数
function getFileContent (filename, callback) {
  const fullFileName = path.resolve(__dirname, 'files', filename);
  fs.readFile(fullFileName, (err, data) => {
    if (err) {
      console.log(err);
    }
    callback(JSON.parse(data.toString()));
  })
}
getFileContent('a.json', adata => {
  console.log('getFileContent-a', adata);
  getFileContent(adata.next, bdata => {
    console.log('getFileContent-b', bdata);
    getFileContent(bdata.next, cdata => {
      console.log('getFileContent-c', cdata);
    })
  })
})


// 使用 promise 实现上述读取文件
function getFileContentPromis (filename) {
  return new Promise((resolve, reject) => {
    const fullFileName = path.resolve(__dirname, 'files', filename);
    fs.readFile(fullFileName, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(JSON.parse(data.toString()));
    })
  })
}
getFileContentPromis("a.json").then(adata => {
  console.log('getFileContentPromis-a', adata);
  return getFileContentPromis(adata.next);
}).then(bdata => {
  console.log('getFileContentPromis-b', bdata);
  return getFileContentPromis(bdata.next);
}).then(cdata => {
  console.log('getFileContentPromis-c', cdata);
})


// 使用 async 实现上述方法
const getFileContentAsync = async function (filename) {
  const fullFileName = path.resolve(__dirname, 'files', filename);
  const f = await new Promise((resolve, reject) => {
    fs.readFile(fullFileName, function (err, data) {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
  const res = JSON.parse(f.toString());
  console.log('getFileContentAsync-' + filename.split('.')[0], res);
  if (res.next) {
    return getFileContentAsync(res.next);
  }
};
getFileContentAsync('a.json');