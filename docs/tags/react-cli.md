---
title: react脚手架的搭建
date: 2021-02-21 14:33
categories: javaScript
tags:
- React
- Vue
---

## 创建项目并启动

**第一步**，全局安装：`npm i -g create-react-app`

**第二步**，切换到想创建项目的目录，使用命令：`create-react-app demo`

**第三步**，进入项目文件夹： `cd  demo`

**第四步**，启动项目： `npm start`

## index.html文件详解
![](https://i.loli.net/2021/02/21/sVIYnkzHyg7AwjM.png)

## index.js
```js
// React.StrictMode写这个可以检测app以及app子组件是否写的合理
ReactDom.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
// reportWebVitals.js这个文件检查页面性能
```