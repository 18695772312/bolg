---
title: 不用js也能用html实现的功能
date: 2021-02-22
categories: other
tags:
- html
---

## 图片懒加载
在不完全考虑兼容性的场景下。可以通过为图片文件添加loading="lazy"的属性来实现:
```html
<img src="image.png" loading="lazy" alt="lazy" width="200" height="200" />
```
## 输入提示
当用户在进行输入搜索功能时，如果能够给出有效的提示.其实，HTML也是能够让我们来实现预定义输入建议功能的，通过<datalist>标签来实现。需要注意的是，使用时这个标签的id属性需要和input元素的list属性一致。
```html
<label for="country">请选择喜欢的国家:</label>
<input list="countries" name="country" id="country">
<datalist id="countries">
  <option value="UK">
  <option value="Germany">
  <option value="USA">
  <option value="Japan">
  <option value="India">
  <option value=“China”>
</datalist>
```
## Picture标签

HTML提供了<picture>标签，允许我们来添加多张图片资源，并且根据不同的分辨率需求来展示不同的图片。这种针对只有一个尺寸的图片素材的时候，我们往往可以通过CSS的object-fit属性来进行裁切适配。

```html
<picture>
  <source media="(min-width:768px)" srcset="med_flower.jpg">
  <source media="(min-width:495px)" srcset="small_flower.jpg">
  <img src="high_flower" style="width: auto;" />
</picture>
```
## Base URL

当我们的页面有大量的锚点跳转或者静态资源加载时，并且这些跳转或者资源都在统一的域名的场景时，我们可以通过<base>标签来简化这个处理。 例如，我们有一个列表需要跳转到微博的不同大V的主页，我们就可以通过设置<base>来简化跳转路径

```html
<head>
  <base href="https://www.weibo.com/" target="_blank">  
</head>
<body>
  <a href="jackiechan">成龙</a>
  <a href="kukoujialing">贾玲</a>
</body>
```
><base>标记必须具有href和target属性。

## 页面重定向（刷新）
我们经常会遇到有些站点会有这样一个功能，“5s后页面将跳转”。这个交互可以嵌入到HTML中，直接通过<meta>标签，设置http-equiv="refresh"来实现
```html
<meta http-equiv="refresh" content="4; URL='https://google.com' />
```
这里content属性指定了重定向发生的秒数。值得一提的是，尽管谷歌声称这种形式的重定向和其他的重定向方式一样可用，但是使用这种类型的重定向其实并不是那么的优雅，往往会显得很突兀。
因此，最好在某些特殊的情况下使用它，比如在长时间用户不活动之后再重定向到目标页面。
::: right
引用 [掘金](https://juejin.cn/post/6931263129661734925)
:::
