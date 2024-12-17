---
title: 宏任务和微任务
date: 2022-04-6
categories:
 - javaScript
tags:
 - js
---

## 什么是事件循环(Event Loop)

js的事件循环，每次读取一个任务，然后执行这个任务，执行完再继续获取下一个，如果暂时没有任务，就暂停执行，等待下一个任务到来；如果在执行任务的过程中有新的任务到达，也不会中断现有任务的执行，而是添加到队列的尾部等待

## 什么是宏任务和微任务

```js
    console.log(100)
    setTimeout(()=>{
        console.log(200)
    })
    Promise.resolve().then(()=>{
        console.log(300)
    })
    console.log(400)
    // 答案为： 100 400 300 200
```

js是单线程的，按照js的读取方式，从上而下，不难理解100和400两个按顺序输出，遇到setTimeout和Promise，根据Event Loop会把他们放大队列中，等待执行，
而setTimeout和Promise为啥先输出300

常见的宏任务和微任务：
* 宏任务：setTimeout，setInterval，Ajax，DOM事件
* 微任务：Promise，async/await

什么是宏任务和微任务？ 宏任务和微任务实际上就是我们常说的异步，微任务比宏任务先执行。
* 宏任务（macroTask或简称Task）：普通的任务，正常执行
* 微任务（microTask）：SVIP年费白金会员任务，优先于宏任务执行（但依然是非抢断的）

看看一个例子

```js
console.log('aaa');

(async ()=>{
  console.log(111);
  await console.log(222);
  console.log(333);
})().then(()=>{
  console.log(444);
});

console.log('ddd');
// 答案为： aaa 111 222 ddd 333 444
```
- 第一步，输出aaa这个同步就不多说了
- 第二步， 输出111， 虽然async是异步操作，但async函数本身（也就是111所在的()=>{}），其实依然是同步执行的，除非有await出现，所以，这里111会直接同步执行，而不是放到队列里等待
- 第三步，输出222，首先，console.log自己是同步的，所以立即就会执行，我们能直接看到222，但是await本身就是then，所以console.log(333)无法直接执行，而是老老实实去排队，而且，因为整个async并未执行完，它的then（也就是444）无法触发
- 第四步， 输出ddd
- 第五步，执行async，拉出队列中的333
- 第六步，执行then 输出444

```js
console.log('aaa');

setTimeout(()=>console.log('t1'), 0);
(async ()=>{
  console.log(111);
  await console.log(222);
  console.log(333);

  setTimeout(()=>console.log('t2'), 0);
})().then(()=>{
  console.log(444);
});

console.log('ddd');
// 答案为： aaa 111 222 ddd 333 444 t1 t2
```
不难理解 setTimeout是宏任务，遇到宏任务放到队列里面，微任务比宏任务优先执行，所以遇到t1,等待执行，等同步和微任务执行完后再执行，t2放在t1后，所以先输出t1再输出t2
