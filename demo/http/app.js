const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
  const method = req.method
  const url = req.url
  const path = url.split('?')[0]
  const query = querystring.parse(url.split('?')[1])

  // 设置返回的字符串格式为 JSON（都是字符串，只是格式不同）
  res.setHeader('Content-type', 'application/json')

  // 返回的数据
  const resData = {
    method,
    url,
    path,
    query
  }
  console.log(res)
  // 返回
  if (method === 'GET') {
    res.end(
      JSON.stringify(resData)
    )
  }
  if (method === 'POST') {
    let postData = ''
    // 后端接受数据，数据量可能会对大，这里req.on('data', () => {})监听数据流，接受数据，
    // 随时来了数据随时就会被触发，
    // 数据流接受数据，data事件会被触发很多次，来一段数据接收一段
    req.on('data', Ï => {
      postData += chunk.toString()
    })
    // 最后接受完毕之后触发 end 事件
    req.on('end', () => {
      resData.postData = postData
      // 返回
      res.end(
        JSON.stringify(resData)
      )
    })
  }
})

server.listen(8000)
console.log('OK')
