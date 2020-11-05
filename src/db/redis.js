const redis = require('redis');
const { REDIS_CONF } = require('../conf/db.js');

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);
redisClient.on('error', err => {
  console.error(err);
});

function set (key, val) {
  if (typeof val === 'object') {
    val = JSON.stringify(val);
  }
  redisClient.set(key, val, redis.print);
}

function get (key) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err);
        return;
      }
      if (val == null) {
        resolve(null);
        return;
      }
      // 若果 val 是 json 就转化，不是就直接返回
      try {
        resolve(JSON.parse(val));
      } catch (ex) {
        resolve(val);
      }
    })
  })
}
// 最后输出 get 和 set 方法进行存储和获取
module.exports = {
  set,
  get
}