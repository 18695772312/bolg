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
