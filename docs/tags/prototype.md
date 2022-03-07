---
title: 关于原型链
date: 2021-03-16 14:38
categories:
 - javaScript
tags:
 - js
---

我还记得第一次在听到**万物皆对象** 这句话的时候是第一次接触JavaScript的对象中听过的，那么什么是对象？

## 对象的概念

对象是人们要进行研究的任何事物，它不仅能表示具体的事物，还能表示抽象的规则、计划或事件。对象具有状态，一个对象用数据值来描述它的状态。对象还有操作，用于改变对象的状态，对象及其操作就是对象的行为。对象实现了数据和操作的结合，使数据和操作封装于对象的统一体中。

这样是不是很难理解，没有关系，我们来手写一下代码！经常听到很多程序员说**没有对象就自己new一个**  所以我们就来new一个

```js
// new 一个 girlfriend

let girlfriend = new Object()
// 给对象一个名字
girlfriend.name = '小花'
// 给她一个年龄
girlfriend.age = 18
// 让她说话
girlfriend.say = function () {
  console.log(`${this.name}要吃饭`)
}
```

以上就是对象，这种方法创建的对象其实现在不常见，人们还是习惯写的方式是花括号的对象（这个人们其实就是我自己比较常写的方式）
```js
let girlfriend = {
  name: '小花',
  age: 18,
  say(){
    console.log(`${this.name}要吃饭`)
  }
}
console.log(girlfriend.say()) // 小花要吃饭
```
> 那么什么是原型链？

## 原型链概念

原型链是一种机制，指的是JavaScript每个对象包括原型对象都有一个内置的[[proto]]属性指向创建它的函数对象的原型对象，即prototype属性。

首先我们要要知道它的规则：
1. 引用类型，都具有对象特性，即可自由扩展属性。

![](https://i.loli.net/2021/03/16/CYny8s2PJWvQFcg.png)

2. 引用类型，都有一个隐式原型 __proto__ 属性，属性值是一个普通的对象。

![](https://i.loli.net/2021/03/16/QlPjwe4RGkzTKfb.png)

3. 引用类型，隐式原型 __proto__ 的属性值指向它的构造函数的显式原型 prototype 属性值。

![](https://i.loli.net/2021/03/16/7L1rdSsV9oY3qzx.png)

4. 当你试图得到一个对象的某个属性时，如果这个对象本身没有这个属性，那么它会去它的隐式原型 __proto__（也就是它的构造函数的显式原型 prototype）中寻找。

![](https://i.loli.net/2021/03/16/vFrO8MITkfSqJoz.png)

上面就可以看出原本obj中并没有toString 属性，但却依然打印出东西，这是因为这个从它的构造函数 Object 的 prototype 里去获取。自己没有的就往上找，所以就找到了 Object.prototype下的 toString 方法。

原型对象prototype上都有个预定义的constructor属性，用来引用它的函数对象。这是一种循环引用。
```js
function F(){};
F.prototype.constructor === F; //true
```