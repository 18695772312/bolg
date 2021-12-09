---
title: 队列方式请求接口
date: 2021-12-09
categories: javaScript
tags:
 - js
---
## 背景


之前在开发中遇到一个问题，由于线上的服务器特别慢，面对表格中的input中每次光标移开都会去请求需求，当第一次请求之后数据库还没保存该条信息，下次的input又发起请求，此时数据就会重复，为了解决这个问题，采用队列的方式，第一次请求回来之后才能再继续下面的请求。形成一个队列，先进先出。


##  实现代码

```js

// 首先先定义一个数组
this.arr = [];
// 当光标移开的时候往数组里面保存当前获取的input的value值（当前行的数据）
const blur: () => {
    // 获取当前行的数据操作 存起来
    this.rowData = rowData // rowData 假装是当前行的数据   
}
// 输入框验证通过后 把当前行的数据放进一开始的数组里， 
const validator: (rule, value, cb) => {
    cb();
    this.arr.push(this.rowData);
    // 判断数组里面只有一组数据的时候才去执行接口的方法 保证只调用一次接口方法、
    if (this.arr.length === 1) {
        this.handleSave();
    }
})
// 队列保存的方法
    handleSave () {
        // 参数取数组的第一个
        const pamars = this.arr[0];
        // 判断如果数组里面有的东西就去请求接口
            if (this.arr.length > 0) {
                saveFillData({
                    pamars
                }).then(() => {
                    // 请求成功后，去删除第一个数据   shift() 方法移除数组的第一项。
                    this.arr.shift();
                    // 成功之后就可以接着下一个请求
                    this.handleSave();
                });
            }
    }
```
