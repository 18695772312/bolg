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
