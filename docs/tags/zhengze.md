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
## 数字的千分位分割法
将123456789转化为123,456,789

```js
let price = '123456789'
let priceReg = /(?!^)(?=(\d{3})+$)/g

console.log(price.replace(priceReg, ',')) // 123,456,789
```
## 手机号3-4-4分割
将手机号18379836654转化为183-7983-6654
```js
const formatMobile = (mobile) => {
  return String(mobile).slice(0,11)
      .replace(/(?<=\d{3})\d+/, ($0) => '-' + $0)
      .replace(/(?<=[\d-]{8})\d{1,4}/, ($0) => '-' + $0)
}

console.log(formatMobile(123)) // 123
console.log(formatMobile(1234)) // 123-4
console.log(formatMobile(12345)) // 123-45
console.log(formatMobile(123456)) // 123-456
console.log(formatMobile(1234567)) // 123-4567
console.log(formatMobile(12345678)) // 123-4567-8
console.log(formatMobile(123456789)) // 123-4567-89
console.log(formatMobile(12345678911)) // 123-4567-8911

```

## 验证密码的合法性
密码长度是6-12位，由数字、小写字符和大写字母组成，但必须至少包括2种字符

必须包含两种字符，有下面四种排列组合方式

① 数字和小写字母组合

② 数字和大写字母组合

③ 小写字母与大写字母组合

④ 数字、小写字母、大写字母一起组合（但其实前面三种已经覆盖了第四种了）

```js
// 表示条件①和②
// let reg = /((?=.*\d)((?=.*[a-z])|(?=.*[A-Z])))/
// 表示条件条件③
// let reg = /(?=.*[a-z])(?=.*[A-Z])/
// 表示条件①②③
// let reg = /((?=.*\d)((?=.*[a-z])|(?=.*[A-Z])))|(?=.*[a-z])(?=.*[A-Z])/
// 表示题目所有条件
let reg = /((?=.*\d)((?=.*[a-z])|(?=.*[A-Z])))|(?=.*[a-z])(?=.*[A-Z])^[a-zA-Z\d]{6,12}$/


console.log(reg.test('123456')) // false
console.log(reg.test('aaaaaa')) // false
console.log(reg.test('AAAAAAA')) // false
console.log(reg.test('1a1a1a')) // true
console.log(reg.test('1A1A1A')) // true
console.log(reg.test('aAaAaA')) // true
console.log(reg.test('1aA1aA1aA')) // true

```
