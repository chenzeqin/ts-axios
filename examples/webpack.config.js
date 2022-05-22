const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

// 读取 webpack.config.js同级目录下的文件，遍历
const entries = fs.readdirSync(__dirname).reduce((entries, dir) => {
  const fullDir = path.join(__dirname, dir) // 文件夹全路径
  const entry = path.join(fullDir, 'app.ts') // app.ts 全路径
  console.log(dir,fullDir,entry)
  // statSync：获取文件、文件夹信息
  if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
    /*
      文件夹并且文件夹下 app.ts文件存在，返回一个对象，key 为目录名 例如：
      {
        simple: [
          'webpack-hot-middleware/client',
          'D:\chenzeqin\PublicProject\ts-axios\examples\simple\app.ts'
        ]
      }
    */
    entries[dir] = ['webpack-hot-middleware/client', entry]
  }
  return entries
}, {})

module.exports = {
  mode: 'development',
  /**
   * 我们会在 examples 目录下建多个子目录
   * 我们会把不同章节的 demo 放到不同的子目录中
   * 每个子目录的下会创建一个 app.ts
   * app.ts 作为 webpack 构建的入口文件
   * entries 收集了多目录个入口文件，并且每个入口还引入了一个用于热更新的文件
   * entries 是一个对象，key 为目录名
   */
  entry: entries,

  // entry:{
  //   app:  path.join(__dirname, './simple/app.ts')
  // },

  /**
   * 根据不同的目录名称，打包生成目标 js，名称和目录名一致
   */
  output: {
    // path: path.join(__dirname, '__build__'),
    filename: '[name].js',
    publicPath: '/__build__/'
  },
  // devServer: {
  //   contentBase: './__build__',
  // },
  module: {
    // 配置loader
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        use: [
          {
            loader: 'tslint-loader'
          }
        ]
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  // 配置plugins
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ]
}
