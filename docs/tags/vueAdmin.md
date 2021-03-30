---
title: element-admin 解决跨域 还出现404问题
date: 2021-03-30
categories: javaScript
tags:
 - Vue
---

## 第一步

找到.env.development文件配置
```js
# just a flag
ENV = 'development'

# base api
VUE_APP_BASE_API = ''
```
## 第二步
找到vue.config.js文件配置
```js
 devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    // 加入
    proxy: {
      [process.env.VUE_APP_BASE_API]: { //  是.env.development 文件的 /dev-api
        target: '接口地址',
        chargeOrigin: true, // 开启代理服务器
        pathRewrite: {
        // '^/dev-api': '',
          ['^' + process.env.VUE_APP_BASE_API]: '' 
        }
      }
    }
  },
```
这样请求的接口就是从本地转发
例如：http://localhost:9528/Access/select


