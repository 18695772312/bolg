---
title: border属性 不一样的用法
date: 2021-02-20
categories: css
tags:
- css
---

## border-width 不支持百分比
## 使用 border-style:double 实现"三道杠"菜单图标

```css
.icon-menu{
  width: 120px;
  height: 20px;
  border-top: 60px double;
  border-bottom: 20 solid;
}
```
## border绘制与color变色实例页面
html部分
```html
<a href class="add" title="继续上传">
  添加图片
</a>
```
css部分
```css
.add {
    display: inline-block;
    width: 76px; height: 76px;
    color: #ccc;
    border: 2px dashed;
    text-indent: -12em;
    transition: color .25s;
    position: relative;
    overflow: hidden;
}
.add:hover {
    color: #34538b;
}
.add::before, .add::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
}
.add::before {
    width: 20px;
    border-top: 4px solid;
    margin: -2px 0 0 -10px;
}
.add::after {
    height: 20px;
    border-left: 4px solid;
    margin: -10px 0 0 -2px;
}
```
![avatar](https://i.loli.net/2021/02/21/KeF4GkHfx5pjQ7R.png)

## border与透明边框的技巧之优雅增加点击区域之搜索框清除按钮实例页面
HTML：
```html
<input id="search" type="search" value="我是初始值" required>
<label for="search" class="icon-clear"></label>
```
CSS：
```css
input[type="search"] {
    width: 200px; height: 40px;
    padding: 10px 40px 10px 10px;
    border: 1px solid #ccc;
    box-sizing: border-box;
}
.icon-clear {
    width: 16px; height: 16px;
    margin: 1px 0 0 -38px;
    border: 11px solid transparent;
    border-radius: 50%;
    background: #999;
    color: white;
    position: absolute;
    visibility: hidden;
}
.icon-clear:before {
    content: "×";
}
input:valid + .icon-clear { 
    visibility: visible;
}
```
JS：
```js
var eleLabel = document.querySelector('label[for="search"]'),
eleSearch = document.getElementById('search');

if (eleLabel && eleSearch) {
    eleLabel.onclick = function() {
        eleSearch.value = '';
    };
}
```
## border绘制倒三角

- 等腰直角

```css
div{
  width: 0;
  border: 10px solid;
  border-color: #f30 transparent transparent;
}
```

