---
title: day.js 的使用
date: 2022-01-08
categories: javaScript
tags:
 - js
---

::: right
来自 [Day.js中文网](https://dayjs.fenxianglu.cn/category/#node-js)
:::
## 介绍

Day.js被设计用于在浏览器和Node.js中工作。 所有代码都应该在这两种环境中工作，所有单元测试都应该在这两种环境中运行。 目前用于ci系统的浏览器有:Windows XP上的Chrome, Windows 7上的IE 8、ie9和10,Windows 10上的IE 11, Linux上的最新Firefox，以及OSX 10.8和10.11上的最新Safari。 如果您想尝试示例代码，只需打开浏览器控制台并输入它们。

## 安装

```js
npm install dayjs --save

```

##  引入

```js
import dayjs from 'dayjs';

```
## 格式化
```js
// 获取当前时间
dayjs().format() 
```
## 转成对象

```js
// 转成对象
dayjs('2022-01-25').toObject()
/* { years: 2022,
     months: 0,
     date: 25,
     hours: 0,
     minutes: 0,
     seconds: 0,
     milliseconds: 0 } */
```
## 经常使用

```js
// 这周
// 设置了zh-cn 一周的开始指向了星期一，而不是星期日
// startOf('day') 将时间指向了 00:00
const start = dayjs().weekday(0).startOf("day");

// dayjs 默认生成现在的时间
const end = dayjs();

// 将dayjs对象格式化为字符串
const range = [start.format(), end.format()];

// 这个月
// 这个月一号0时0分
const start = dayjs().startOf("M");

const end = dayjs();
const range = [start.format(), end.format()];

// 最近三个月
// 从当前时间减去2个月，然后获取那个月的第一天0时0分
const start = dayjs().subtract(2, "M") .startOf("M");

const end = dayjs();

// 增加时间
dayjs('2000-1-1 11:00:00') .add(2, 'h') .format("YYYY-MM-DD hh:mm:ss") // 2000-01-01 01:00:00
dayjs('2000-1-1 11:00:00') .add(2, 'h') .format("YYYY-MM-DD HH:mm:ss") // 2000-01-01 13:00:00

// 获取最近一个月
  const startSendTime = dayjs().subtract(1, 'month').format('YYYY-MM-DD 00:00:00');
  const endSendTime = dayjs().format('YYYY-MM-DD 23:59:59');
```
