---
title: 数组扩展方法(ES5)
date: 2021-04-27
categories: javaScript
tags:
- js
---

## 数组扩展方法(ES5)

### forEach()  遍历

arr.forEach(function(elem, index, array) {} , obj)

参数1：函数（返回三个参数， 元素，元素下标，遍历的数组）

参数2：更改第一个参数函数的this指向。如果为null, undefined则依然指向window，如果是指向基本类型数据，则会指向相应的包装类。



### filter()  筛选/过滤

arr.filter(function(elem, index, array) {}, obj)

返回一个新的数组，将方法内为true的数据返回到新数组中。

参数1： 函数（返回三个参数， 元素，元素下标，遍历的数组）

参数2：更改第一个参数函数的this指向。如果为null, undefined则依然指向window，如果是指向基本类型数据，则会指向相应的包装类。

````js
var newArr = arr.filter(function(elem, index, array) {}, obj)
````





### map()  映射

arr.map(function(elem, index, array) {}, obj)

返回一个新的数组, 方法内可以进行逻辑处理后再return值。

参数1： 函数（返回三个参数， 元素，元素下标，遍历的数组）

参数2：更改第一个参数函数的this指向。如果为null, undefined则依然指向window，如果是指向基本类型数据，则会指向相应的包装类。

````js
var newArr = arr.map(function(elem, index, array) {
  elem.name = elem + 'aaa'
  return elem
}, obj)
````





### every() 

如果有一个不满足条件就停止遍历，条件就是return后面表达式，会返回一个布尔值。

arr.every(function(elem, index, array) {}, obj)

参数1： 函数（返回三个参数， 元素，元素下标，遍历的数组）

参数2：更改第一个参数函数的this指向。如果为null, undefined则依然指向window，如果是指向基本类型数据，则会指向相应的包装类。





### some()

如果有一个满足条件就停止遍历，条件就是return后面表达式，会返回一个布尔值

arr.some(function(elem, index, array) {}, obj)

参数1： 函数（返回三个参数， 元素，元素下标，遍历的数组）

参数2：更改第一个参数函数的this指向。如果为null, undefined则依然指向window，如果是指向基本类型数据，则会指向相应的包装类。


### find()   

```js
[1,2].find(item =>{ return item ==1})
//输出1
```

### reduce()   归纳函数  无比重要！

array.reduce(function(prev, elem, index, array){}, initialValue)

返回一个新的数组

参数1： 函数（返回四个参数，prev， 元素，元素下标，遍历的数组）

参数2：initialValue  初始值

参数1函数中的参数prev的初始值就是initialValue

````js
var data = [1,2,3,4,5]
var initialValue = [];
var nArr = data.reduce(function(prev, elem, index, arr) {
  console.log(prev)   // 此时只有第一次打印出'[]'， 后面都是undefined
}, initialValue)
````

````js
var data = [1,2,3,4,5]
var initialValue = [];
var nArr = data.reduce(function(prev, elem, index, arr) {
  console.log(prev)     // 打印5次'[]'  因为每次都将prev return了出去
  return prev
}, initialValue)
````

````js
var data = [1,2,3,4,5]
var initialValue = [];
var nArr = data.reduce(function(prev, elem, index, arr) {
  prev.push(elem)
  console.log(prev)   // [1]  [1, 2]  [1, 2, 3]  [1, 2, 3, 4], [1, 2, 3, 4, 5]
  return prev
}, initialValue)
````

````js
var data = [1,2,3,4,5]
var initialValue = [];
var nArr = data.reduce(function(prev, elem, index, arr) {
  if(elem % 2 == 0) {
     prev.push(elem)
  }
  return prev
}, initialValue)
console.log(nArr)     //  [2, 4]
````



### reduceRight()

就是reduce()的倒序
