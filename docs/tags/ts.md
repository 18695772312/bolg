---
title: typeScript 入门
date: 2022-03-06
categories: javaScript
tags:
 - js
---

## 安装 TypeScript

```js
// 全局安装
npm install -g typescript
// 查看版本
tsc -V 
```
::: right
来自 [文档](https://24kcs.github.io/vue3_study/chapter1/03_HelloWorld.html#%E7%BC%96%E5%86%99-ts-%E7%A8%8B%E5%BA%8F)
:::
 ## 数据类型

 1. number

```ts
let num:number = 123;
// num = 'sas'; // 错误
num = 456;  //正确
```
 2. boolean

```ts
let flag:boolean = true;
// flag = 123; // 错误
flag = false;  //正确

```
 3. string
```ts
let str:string = 'this is ts';
str = 'test';

```

 4. array

```ts
 let arr:string[] = ['12', '23'];
 arr = ['45', '56'];

 let arr:Array<number> = [1, 2];
arr = [45, 56];

```
5. object

```ts
let obj:object;
obj = {name: 'Wang', age: 25};

// 一般都是直接写
const  obj = { name: 'Wang', age: 25 };
```
6. null和undefined

```ts
// 默认情况下null和undefined是所有类型的子类型， 就是说你可以把 null和 undefined赋值给 number类型的变量
let n1:null = null
let n2:undefined = undefined

let num:number | undefined; // 数值类型 或者 undefined
console.log(num); // 正确
num = 123;
console.log(num); // 正确
```
7. symbol 

```ts
const title1 = Symbol('title')
const title2 = Symbol('title')
const info ={
    [title1]: '成',
    [title2]: 'dssds'
}
```
8. any

```ts
let message:any = '122'
message = 0
message = true
message = {}
```
9. unknown

unknown类型只能赋值给any和unknown类型。他用于描述类型不确定的变量

10. void

用于标识方法返回值的类型，表示该方法没有返回值。
```ts
function hello(): void {
    alert("Hello Runoob");
}
```
11. never

表示永远不会发生值的类型，
如果一个函数中是一个死循环或者抛出一个异常，就可以使用never

12.tuple
元祖类型，允许表示一个已知元素数量和类型的数组，各元素的类型不必相同

```ts
let tupleArr:[number, string, boolean]; 
tupleArr = [12, '34', true]; //ok

```
