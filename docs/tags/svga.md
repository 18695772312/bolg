---
title: web 展示svga动画
date: 2021-04-21
categories: javaScript
tags:
- js
- vue
---

## 安装

```js
npm install svgaplayerweb --save

<!-- cdn 引入 -->
<script src="https://cdn.jsdelivr.net/npm/svgaplayerweb@2.3.1/build/svga.min.js"></script>
```

## 导入
```js
import SVGA from 'svgaplayerweb'
```

## 使用
1. HTML

```html
<div id="demoCanvas" style="height:500px" />
```

2. js
 ```js
handlePaly() {
      this.$nextTick(async() => {
        const player = new SVGA.Player('#demoCanvas')
        const parser = new SVGA.Parser('#demoCanvas')
        parser.load(
          this.detailData.src,
          function(videoItem) {
            player.setVideoItem(videoItem)
            player.startAnimation()
          }
        )
      })
    },
```
> 使用this.$nextTick的原因是，在弹框中加载动画，在数据还没渲染出来时加载会报错

::: right
[文档](https://github.com/svga/SVGAPlayer-Web)
:::
但这里有个坑，因为在项目中，后端传过来的svga地址是完整的地址，请求会出现跨域问题。使用vue代理也没有用

```js
//vuw.config.js
    proxy: {
      // 选项写法
      '/svga': {
        target: '文件存放的地址',
        changeOrigin: true
      }
    }
```
试了一下，配置代理后，
```js
        parser.load(
          'http://localhost:9528/svga/文件名', //从本地请求
          function(videoItem) {
            player.setVideoItem(videoItem)
            player.startAnimation()
          }
        )
```
这样就不跨域了，所以这边做好喝后端商量一下给的文件地址不要不整个地址丢过来。