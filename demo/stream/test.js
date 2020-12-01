// 1.标准输入输出
process.stdin.pipe(process.stdout);


// 2.请求IO，请求带来的数据一点一点流过来
const http = require('http');
const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    req.pipe(res);
  }
});
server.listen(8000);


// 3.文件IO，复制文件
const fs = require('fs');
const path = require('path');
const fileName1 = path.resolve(__dirname, 'data.txt');
const fileName2 = path.resolve(__dirname, 'data2.txt');
const readStream = fs.createReadStream(fileName1);//读取文件的流
const writeStream = fs.createWriteStream(fileName2);//写入文件的流
readStream.pipe(writeStream);
readStream.on('data', chunk => {
  console.log(chunk.toString());//每次读取文件的内容
});
readStream.on('end', () => {
  console.log('copy done');//读取完毕
});


// 4.网络IO与文件IO
const http = require('http');
const fs = require('fs');
const path = require('path');
const fileName1 = path.resolve(__dirname, 'data.txt');
const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    const readStream = fs.createReadStream(fileName1);
    readStream.pipe(res);
  }
});
server.listen(8000);