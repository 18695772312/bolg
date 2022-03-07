---
title: moment.js 的使用
date: 2021-03-5 14:33
categories: javaScript
tags:
- js
---

## 安装
```js
npm install moment --save   // npm
yarn add moment             // Yarn
```

## 日期格式化

```js
moment().format('YYYY-MM-DD HH:mm:ss'); // ’2021-03-05 14:10:10‘
```
## 字符串转日期

```js
moment('2015-11-30').toDate();
moment('2015-11-30 10:20:15').toDate();

```
## 毫秒转日期
```js
moment(1448896064621).toDate(); // Mon Nov 30 2015 23:07:44 GMT+0800 (中国标准时间)

moment(moment(1448896064621).toDate()).format('YYYY-MM-DD HH:mm:ss') // 2015-11-30 23:07:44

```
> 注意传入的时间戳是数值类型不是字符串

## 时间加减

```js
moment().add(7,'years'); // 加7年
moment().add(7,'month');// 加7个月
moment().add(7,'days'); // 加7天
moment().add(7,'hours'); // 加7小时
moment().add(7,'minutes');// 加7分钟
moment().add(7,'seconds');// 加7秒钟

moment().subtract(7,'years'); // 减7年
moment().subtract(7,'month');// 减7个月
moment().subtract(7,'days'); // 减7天
moment().subtract(7,'hours'); // 减7小时
moment().subtract(7,'minutes');// 减7分钟
moment().subtract(7,'seconds');// 减7秒钟
```

## 获取当前时间


```js

// 获取今天0时0分0秒
moment().startOf('day')
moment(moment().startOf('month')).format('YYYY-MM-DD HH:mm:ss') //2021-03-05 00:00:00
// 获取本周第一天(周日)0时0分0秒
moment().startOf('week')
// 获取当前月第一天0时0分0秒
moment().startOf('month')
```

## 毫秒转时间格式

```js
// 转成 00:23
const withData = (param) => {
  return param < 10 ? '0' + param : '' + param;
}

const dateFormat = (x) => {
  var y = moment.duration(x, 'milliseconds');
  return [withData(y.minutes()), withData(y.seconds())].join(":")
}
```


