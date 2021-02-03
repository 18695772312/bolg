---
title: vue.js之混入mixins
date: 2021-02-03 13:34
categories:
 - javaScript
tags:
 - js
 - Vue
---



##  什么是混入

个人理解，它相当于一个全局的库，可多个组件共用它的data,methods,mounted等。首页需要提供一个混入的对象
```js
const myMixin = {
  data(){
    return {
      message:'我是消息'
    }
  }
  created () {
    this.hello()
  },
  methods: {
    hello () {
      console.log('我是hello的消息')
    }
  }
}
```
在想要使用的的组件中使用
```js
// 在该组件中就可以使用混入中的东西 了
export default {
  mixins: [myMixin],
  data() {
    return {
      count: 0
    } 
  }
  created () {
    console.log(this.message)
    // 我是消息
    //我是hello的消息
  }
}
```