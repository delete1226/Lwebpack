let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
let TerserJSPlugin = require('terser-webpack-plugin')
module.exports = {
  devServer: { // 开发服务器的配置
    port: 3000,
    progress: true,
    contentBase: './dist'
  },
  mode: 'development', // 模式默认两个 production development
  entry: './src/index.js', // 入口
  output: {
    filename: 'main.js', // 打包后的文件名
    path: path.resolve(__dirname, 'dist')// 路径必须是一个绝对路径
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  plugins:[ // 数组放着所有webpack插件
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    })
  ],
  module: { // 模块
    rules:[ // 规则 css-loader 解释@import这种语法 style-loader把css插入head的标签中 loader特点：单一 一个loader只做一件事,多个loader需要[], loader顺序默认右向左执行
      {test: /\.css$/, use:[MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']},
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties'
            ]
          }
        }
      }
    ]
  }
}