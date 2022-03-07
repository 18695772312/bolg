---
title: 数组的扩展(ES6)
date: 2021-06-15
categories: javaScript
tags:
- js
---

## 数组扩展方法(ES6)

#### Array.from()
Array.from方法用于将两类对象转为真正的数组

```js
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
```

字符串转数组



```js
Array.from('hello')
// ["h", "e", "l", "l", "o"]
```

#### Array.of() 

Array.of()方法用于将一组值，转换为数组。

```js
Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
// 比较Array

Array() // []
Array(3) // [, , ,]
Array(3, 11, 8) // [3, 11, 8]
```
#### includes() 

```js
[1, 2, 3].includes(2)     // true
[1, 2, 3].includes(4)     // false
[1, 2, NaN].includes(NaN) // true
```

#### flat()
将二维数组变成一维数组
```js
[1, 2, [3, 4]].flat()
// [1, 2, 3, 4]