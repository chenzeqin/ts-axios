/*
  开启一个node开发服务器:https://github.com/webpack/webpack-dev-middleware
*/
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
var bodyParser = require('body-parser')
const config = require('./webpack.config.js')
const router  = require('./router.js')


const app = express()
// parse application/json
app.use(bodyParser.json())
// app.use(bodyParser.text())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(router)

const compiler = webpack(config)

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
      chunks: false
    }
    // writeToDisk:true,
  })
)

// 需要在webpack.config.js配置plugins
app.use(webpackHotMiddleware(compiler))
// 处理静态资源
app.use(express.static(__dirname))

// Serve the files on port 3000.
app.listen(3000, function() {
  console.log('localhost:3000')
})
