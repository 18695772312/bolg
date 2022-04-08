---
title: 好用的方法收藏
date: 2021-12-30
categories: javaScript
tags:
 - js
---


##  判断对象是否为空

```js
const isEmptyObj = obj => (
    !obj || Object.keys(obj).length === 0
);
```

## 深拷贝

```js
// 因为JSON.parse(JSON.stringify())不能处理函数
//origin表示待拷贝对象，target表示目标对象
            function deepClone(origin, target) {
                var target = target || {}, //容错处理，防止用户不传target值
                    toStr = Object.prototype.toString,
                    arrAtr = "[object Array]";
                for (var prop in origin) {
                    //遍历对象
                    if (origin.hasOwnProperty(prop)) {
                        //防止拿到原型链属性
                        if (
                            origin[prop] !== "null" &&
                            typeof origin[prop] == "object"
                        ) {
                            //判断是不是原始值
                            target[prop] =
                                toStr.call(origin[prop]) == arrAtr ? [] : {}; //建立相对应的数组或对象
                            deepClone(origin[prop], target[prop]); //递归，为了拿到引用值里面还有引用值
                        } else {
                            target[prop] = origin[prop]; //是原始值，直接拷贝
                        }
                    }
                }
                return target;
            }

```
## 数组对象去重


```js
    // 第一种
    function getUnique(arr) {
        const newArr = arr.map(item => {
            return JSON.stringify(item)
        })
        return [...new Set(newArr)].map(item => JSON.parse(item))
    }
    // 第二种
    function getUnique2(arr) {
        const map = {};
        // 1、把数组元素作为对象的键存起来（这样就算有重复的元素，也会相互替换掉）
        /* eslint-disable */
        arr.forEach(item => map[JSON.stringify(item)] = item);
        // 2、再把新对象的键名抽成一个数组返回即为不重复的集合
        return Object.keys(map).map(key => JSON.parse(key));
    }
    // 以上两种方式都存在一个问题，但对象的key顺序不同，就排查不出重复的对象

    // 第三种
    let arr = [{id:1,name:12},{id:2,name:12},{id:1,name:13}];

    const getUnique3 = (arr)=>{
        return Object.entries(arr.reduce((obj,item)=>{
            obj[item.id] = item
            return obj
        },{})).map(item=>item[1])
    }
    console.log(getUnique3(arr)) // [{id:1,name:13},{id:2,name:12}]
    // Object.entries() 方法返回一个给定对象自身可枚举属性的键值对数组
    //  传入对象
    const obj = { foo: 'bar', baz: 'abc' }; 
    console.log(Object.entries(obj));  // [['foo', 'bar'], ['baz', 'abc']]
    // 数组
    const arr = [1, 2, 3]; 
    console.log(Object.entries(arr));  // [['0', 1], ['1', '2'], ['2', '3']]
    // 数组对象
    const arr2 = [{ a: 1 }, { b: 2 }, { c: 3 }]; 
    console.log(Object.entries(arr2));  // [['0', { a: 1 }], ['1', { b: 2 }], ['2', { c: 3 }]]
```
