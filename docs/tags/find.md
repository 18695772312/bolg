---
title: find 和 some的区别
date: 2021-05-08
categories: javaScript
tags:
- js
---

## find 和 some的区别
### some
定义和用法：some() 方法用于检测数组中的元素是否满足指定条件（函数提供）。
some() 方法会依次执行数组的每个元素：
如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测。
如果没有满足条件的元素，则返回false。

>注意： some() 不会对空数组进行检测。
>
>注意： some() 不会改变原始数组。

### find
定义和用法 : find() 方法返回通过测试（函数内判断）的数组的第一个元素的值。
find() 方法为数组中的每个元素都调用一次函数执行：
当数组中的元素在测试条件时返回 true 时, find() 返回符合条件的元素，之后的值不会再调用执行函数。
如果没有符合条件的元素返回 undefined

>注意: find() 对于空数组，函数是不会执行的。
>
>注意: find() 并没有改变数组的原始值。

## 区别

同样是用来检测数组中符合条件的元素，但是 some 和 find 的返回值不同，some方法找到符合条件的值则立即返回true，全都不符合则返回false，而 find 方法找到符合条件的值后会返回符合条件的那一项 ,所以在开发中视业务需求选择对应的方法。