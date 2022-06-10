const express = require('express')
const router = express.Router()
const atob = require('atob')
/* simple 基本功能 */
router.get('/simple/get', (req, res) => {
  res.json(req.query)
})
// 测试data转换,需要设置 content-type:application/json
router.post('/simple/post', (req, res) => {
  res.json(req.body)
})
// post data为buffer
router.post('/simple/buffer', (req, res) => {
  let msg = []
  req.on('data', chunk => {
    if (chunk) {
      msg.push(chunk)
    }
  })
  req.on('end', () => {
    const buf = Buffer.concat(msg)
    res.json(buf.toJSON())
  })
})

/* error 异常处理 */
router.get('/error/random', (req, res) => {
  if (Math.random() > 0.5) {
    res.json({ msg: 'request is ok' })
  } else {
    res.status(500)
    res.end()
  }
})
// status is not 200
router.get('/error/timeout', (req, res) => {
  setTimeout(() => {
    res.json({ msg: 'wait for 5s' })
  }, 5000)
})

/* extend 接口扩展 */
router.get('/extend/get', (req, res) => {
  res.json({ msg: 'ok' })
})
router.post('/extend/post', (req, res) => {
  res.json(req.body)
})

/* interceptor 拦截器 */
router.get('/interceptor/get', (req, res) => {
  res.end('hello')
})
/* config 合并配置 */
router.post('/config/post', function(req, res) {
  res.json(req.body)
})

/* cancel 取消功能 */
router.get('/cancel/get', function(req, res) {
  setTimeout(() => {
    res.json('hello')
  }, 1000)
})

router.post('/cancel/post', function(req, res) {
  setTimeout(() => {
    res.json(req.body)
  }, 1000)
})

/* more 更多功能 */
router.get('/more/get', function(req, res) {
  res.json(req.cookies)
})
// grogress 上传进度
router.post('/more/upload', function(req, res) {
  console.log(req.body, req.files)
  res.json('upload ok')
})
// auth
router.post('/more/auth', function(req, res) {
  const auth = req.headers.authorization
  console.log(auth)
  if (auth) {
    const [type, credentials] = auth.split(' ')
    if (credentials) {
      const [username, password] = atob(credentials).split(':')
      if (type === 'Basic' && username === 'admin' && password === '123') {
        res.json(req.body)
      } else {
        res.end('UnAuthorization')
      }
    }
  }

  res.json(req.data)
})

// valistate status
router.get('/more/304', function(req, res) {
  res.status(304)
  res.end('ok')
})
// params 序列化
router.get('/more/params', function(req, res) {
  res.json(req.query)
})

module.exports = router
