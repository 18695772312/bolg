---
title: webpack 入门
date: 2022-03-11
categories:
 - javaScript
tags:
 - js
---
## webpack 是什么

它是一种前端资源构建工具，一个静态模块打包器。在webpack看来，前端的所有资源文件（js/json/css/img/less....）都会被
模块化处理，它根据模块的依赖关系进行静态分析，打包生成的静态资源。（bundel）

## webpack五个核心概念
  
* entry

入口提示，webpack以哪个文件为入口起点开始打包，分析构建内部依赖图。

* output

输出指示，webpack打包后资源bundles输出到哪里去，以及如何命名

* loader  

loader 让webpack能够去处理那些非JavaScript文件（webpack自身只理解JavaScript）

* plugins

插件可以执行范围更广的任务，插件范围包括，从打包优化和压缩，一直到重新定义环境的变量等。
 
* mode

模式指示webpack使用相应模式的配置
1. development。
   会将process.env.NODE_ENV的值设为development。
   启用NamedChunksPlugin和NameModulePlugin。
   特点：能让代码本地调试运行的环境
2. production。
   会将会将process.env.NODE_ENV的值设为production。
   启用FlagDependencyUsagePlugin、FlagIncludedChunksPlugin,ModuleConcatenationPlugin,NoEmitOnErrorsPlugins,
   OccurrenceOrderPlugin,SideEffectsFlagPlugin和UglifyJsPlugin.
   特点：能让代码优化上线运行的环境
## 安装

```js
npm i webpack webpack-cli -g //全局安装
npm i webpack webpack-cli -D // 本地安装 
```
index.js:webpack入口起点文件

```js
// 1.运行命令
// 开发环境： webpack ./src/index.js -o ./build/built.js --mode=development
// 意思是：webpack会以./src/index.js为入口文件开始打包，打包后输出到 ./build/built.js
// 整体打包环境是开发环境
// 生产环境 ：webpack ./src/index.js -o ./build/built.js --mode=production
```
## 打包样式资源
src/webpack.config.js  webpack的配置文件

```js

// resolve用来拼接绝对路径的方法
const { resolve } = require('path');

module.exports ={
   // webpack配置
   // 入口起点
   entry: './src/index.js',
   // 输出
   output: {
      // 输出文件名
      filename: 'built.js',
      // 输出路径
      // __dirname nodejs的变量，代表当前文件的目录绝对路径
      path: resolve(__dirname, 'build')
   },
   // loader配置
   module: {
      rules: [
         // 详细loader配置
         {
            // 匹配哪些文件
            test: /\.css$/,
            // 使用哪些loader处理
            use: [
               // use数组中的loader执行顺序：从右到左，从上到下
               // 创建style标签，将js中的样式资源插入进行，添加到head中生效
               'style-loader',
               // 将css文件变成commonjs模块加载js中，里面内容是样式字符串
               'css-loader'
            ]
         }
      ]
   },
   // plugins插件配置
   plugins: [
         
   ],
   // 模式
   mode: 'development' // 生产环境或测试环境
}
```
## 打包html资源

```js

// resolve用来拼接绝对路径的方法
const { resolve } = require('path');
const { HtmlWebpackPlugin } = require('html-webpack-plugin');

module.exports ={
   // webpack配置
   // 入口起点
   entry: './src/index.js',
   // 输出
   output: {
      // 输出文件名
      filename: 'built.js',
      // 输出路径
      // __dirname nodejs的变量，代表当前文件的目录绝对路径
      path: resolve(__dirname, 'build')
   },
   // loader配置
   module: {
      rules: [
         // 详细loader配置
        
      ]
   },
   // plugins插件配置
   plugins: [
      // 默认创建一个空的HTML自动引入打包输出的所有资源
        new HtmlWebpackPlugin({
            //  复制./src/index.html文件，并自动引入打包输出的所有资源
           template: './src/index.html'
        })
   ],
   // 模式
   mode: 'development' // 生产环境或测试环境
}
```
## 打包图片资源
```js
// resolve用来拼接绝对路径的方法
const { resolve } = require('path');
const { HtmlWebpackPlugin } = require('html-webpack-plugin');

module.exports ={
   // webpack配置
   // 入口起点
   entry: './src/index.js',
   // 输出
   output: {
      // 输出文件名
      filename: 'built.js',
      // 输出路径
      // __dirname nodejs的变量，代表当前文件的目录绝对路径
      path: resolve(__dirname, 'build')
   },
   // loader配置
   module: {
      rules: [
         {
            test: /\.css$/,
            use: [  'style-loader', 'css-loader', 'less-loader']
         },
         {
            // 处理图片
            test: /\.(jpg|png|gif)$/,
            // 使用一个loader
            loader: 'url-loader',
            options: {
               // 图片大小小于8kb就会被base64处理
               limit: 8 * 1024,
               esModule: false //关闭url-loader的es6模块化，使用commonjs解析
            }
         },
         {
            // 处理html图的图片
            test: /\.html$/,
            loader: 'html-loader'
         }
      ]
   },
   // plugins插件配置
   plugins: [
        new HtmlWebpackPlugin({
           template: './src/index.html'
        })
   ],
   // 模式
   mode: 'development'
}
```
