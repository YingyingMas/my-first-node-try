const redis = require('redis');

// 创建客户端
const redisClient = redis.createClient(6379, '127.0.0.1');

//监控error
redisClient.on('error', err => {
    console.error(err)
});

// 测试
// 插入
redisClient.set('myname', 'zhangsan2', redis.print);
// 获取：异步操作
redisClient.get('myname', (err, val) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('val ', val);

    // 退出 Redis
    redisClient.quit()
})

// 终端运行 node index.js，输出 Reply: OK      val  zhangsan2