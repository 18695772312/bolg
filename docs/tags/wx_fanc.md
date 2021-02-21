---
title:  微信小程序中，值得收藏的一些处理方法
date: 2021-02-04
categories:
 - 微信小程序
tags:
 - js
 - 微信小程序
---

:::tip
切割字符串 2天4小时7分钟 成为数字和文字分离
:::
```js
export function toSplit(value){
  let rex = /(.*?)天(.*?)小时(.*?)分/igs
  return rex.exec(value)
}
toSplit('2天4小时7分钟') // 输出 ['2天4小时7分钟',2,3,7]
```
:::tip
计算两地距离
:::
```js
export function distance(la1, lo1, la2, lo2) {
  var La1 = la1 * Math.PI / 180.0;
  var La2 = la2 * Math.PI / 180.0;
  var La3 = La1 - La2;
  var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
  s = s * 6378.137; //地球半径
  s = Math.round(s * 10000) / 10000;
  return s
}
```
:::tip
保留两位小数
:::

```js
//utils文件下的filter.wxs
var filters = {
  toFix: function (value) {
    return Number(value).toFixed(2) // 此处2为保留两位小数，保留几位小数，这里写几    
  },
}

module.exports = {
  toFix: filters.toFix,
}
```
// wxml中调用
<wxs module="filters" src="../../utils/filters.wxs"></wxs>

:::tip
微信request异步请求封装
:::

```js
// 一般单独一个文件夹service
// config.js
export const baseURL = 'https://基础地址'
export const timeout = 5000
// network.js
import{baseURL} from './config.js'

export default function request(options){
  return new Promise((resove, reject) => {
    wx.request({
      url: baseURL + options.url,
      method: options. method || 'get',
      data: options.data || {},
      success: function(res){
        resove(res) 
      },
      fail: function(err){
        reject
      }
    })
  }) 
}
// home.js
import request from './network.js'
// get
export function getData(url, data) {
  return request({
    url: url,
    data: data
  })
}
// post
export function postRequest(url, data) {
  return request({
    method: 'post',
    url: url,
    data: data
  })
}
// DELETE
export function deleRequest(url, data) {
  return request({
    method: 'DELETE',
    url: url,
    data: data
  })
}
```
:::tip
获取当前日期yy-mm-dd
:::
```js
//date 为时间对象
export function getDateStr3(date) {
  var year = "";
  var month = "";
  var day = "";
  var now = date;
  year = "" + now.getFullYear();
  if ((now.getMonth() + 1) < 10) {
    month = "0" + (now.getMonth() + 1);
  } else {
    month = "" + (now.getMonth() + 1);
  }
  if ((now.getDate()) < 10) {
    day = "0" + (now.getDate());
  } else {
    day = "" + (now.getDate());
  }
  return year + "-" + month + "-" + day;
}
```
:::tip
获得相对当前周AddWeekCount个周的起止日期 
:::
```js
// AddWeekCount为0代表当前周   为-1代表上一个周   为1代表下一个周以此类推
export function getWeekStartAndEnd(AddWeekCount) {
  //起止日期数组   
  var startStop = new Array();
  //一天的毫秒数   
  var millisecond = 1000 * 60 * 60 * 24;
  //获取当前时间   
  var currentDate = new Date();
  //相对于当前日期AddWeekCount个周的日期
  currentDate = new Date(currentDate.getTime() + (millisecond * 7 * AddWeekCount));
  //返回date是一周中的某一天
  var week = currentDate.getDay();
  //返回date是一个月中的某一天   
  var month = currentDate.getDate();
  //减去的天数   
  var minusDay = week != 0 ? week - 1 : 6;
  //获得当前周的第一天   
  var currentWeekFirstDay = new Date(currentDate.getTime() - (millisecond * minusDay));
  //获得当前周的最后一天
  var currentWeekLastDay = new Date(currentWeekFirstDay.getTime() + (millisecond * 6));
  //添加至数组   
  startStop.push(getDateStr3(currentWeekFirstDay));
  startStop.push(getDateStr3(currentWeekLastDay));

  return startStop;
}
```
:::tip
获得相对当月AddMonthCount个月的起止日期
:::
```js
// AddMonthCount为0 代表当月 为-1代表上一个月  为1代表下一个月 以此类推
export function getMonthStartAndEnd(AddMonthCount) {
  //起止日期数组   
  var startStop = new Array();
  //获取当前时间   
  var currentDate = new Date();
  var month = currentDate.getMonth() + AddMonthCount;
  if (month < 0) {
    var n = parseInt((-month) / 12);
    month += n * 12;
    currentDate.setFullYear(currentDate.getFullYear() - n);
  }
  currentDate = new Date(currentDate.setMonth(month));
  //获得当前月份0-11   
  var currentMonth = currentDate.getMonth();
  //获得当前年份4位年   
  var currentYear = currentDate.getFullYear();
  //获得上一个月的第一天   
  var currentMonthFirstDay = new Date(currentYear, currentMonth, 1);
  //获得上一月的最后一天   
  var currentMonthLastDay = new Date(currentYear, currentMonth + 1, 0);
  //添加至数组   
  startStop.push(getDateStr3(currentMonthFirstDay));
  startStop.push(getDateStr3(currentMonthLastDay));
  //返回   
  return startStop;
}
```
:::tip
获取昨天的时间
:::
```js
export function getYesterday(){
  //起止日期数组   
  var startStop = new Array();
  var day1 = new Date();
  day1.setTime(day1.getTime()-24*60*60*1000);
  startStop.push(getDateStr3(day1));
  startStop.push(getDateStr3(day1));
  //返回   
  return startStop;
}
```
:::tip
今天的时间
:::
```js
export function getNowDay(){
  //起止日期数组   
  var startStop = new Array();
  var day2 = new Date();
  day2.setTime(day2.getTime());
  startStop.push(getDateStr3(day2));
  startStop.push(getDateStr3(day2));
  //返回   
  return startStop;
}
```