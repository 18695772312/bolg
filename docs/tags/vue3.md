---
title: vue3从入门到精通（一）
date: 2022-02-05
categories: javaScript
tags:
 - Vue
---

## 创建Vue3工程



1. 使用vue-cli创建

::: right
来自 [官方文档](https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create)
:::

```js
// 查看@vue/cli版本，确保@vue/cli版本再4.5.0以上
vue --version
// 安装或升级@vue/cli
npm install -g @vue/cli

// 创建
vue create vue3
// 启动
cd vue3
npm run serve
```

2. 使用vite 创建

::: right
来自 [官方文档](https://v3.cn.vuejs.org/guide/installation.html#vite)
:::


[Vite中文网](https://vitejs.cn/guide/)
* 什么是vite? ------ 下一代前端开发与构建工具
* 优势如下：
  * 开发环境中，无需打包操作，可快速的冷却启动。
  * 轻量快速的热重载（HMR）。
  * 真正的按需编译，不再等待整个应用编译完成。

```js
// 创建工程
npm init vite-app <project-name>
// 进入工程目录
cd <project-name>
// 安装依赖
npm install
// 运行
npm run dev
```
## 使用vue-cli创建的项目文件分析
1. main.js

```js
// 引入的不再是Vue构造函数了，引入的是一个名为createAPP的工厂函数
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
// 上行可拆解为
const app = createApp(App) // 创建应用实例对象--app(类似于之前Vue2中的vm，但app比vm更“轻”)
app.mount('#app') // mount(挂载)

// 比较一下vue2的写法
const vm = new Vue({
    render: h => h(App)
})
vm.$mount('#app')
```
