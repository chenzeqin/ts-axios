const express = require('express')

const router = express.Router()
/* simple */
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
/* error */
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

module.exports = router
