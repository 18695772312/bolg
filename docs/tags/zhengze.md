---
title: 常用到到正则校验表达式
date: 2021-10-27
categories: javaScript
tags:
 - js
 - 正则
---

## 只能输入数字或含两位小数的正则
```js
const reg=/^\d+(\.\d{0,2})?$/;

reg.test("12"); // true
reg.test("12.1"); // true
reg.test("12.11"); // true
reg.test("12.111"); // false
reg.test("."); // false
reg.test("12.1."); // false

```
##  验证手机号码

```js
const phoneReg = /^1[^0-2]{1}[0-9]{9}$/g;

```
## 验证 固定电话

```js
const reg = /0\d{2,3}-\d{7,8}/;

```
## 验证居民身份证

```js
const certTypeReg = new RegExp('^[1-9]\\d{5}(18|19|20)\\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$');
```

## 校验中国护照

```js
const certTypeReg = /^([a-zA-z]|[0-9]){5,17}$/;

```
## 验证电子邮箱

```js
const emailReg = /^\S+@\S+\.\S+$/;
```
