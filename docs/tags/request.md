---
title: 前端开发常用的几种请求方式
date: 2021-02-20
author: loveStarBoys
categories: javaScript
tags:
- js
---

## 一.原生的Ajax方法
```js
  function createXMLHttpRequest() {
      if (window.ActiveXObject) {
          return new ActiveXObject("Microsoft.XMLHTTP");
      } else if (window.XMLHttpRequest) {
          return new XMLHttpRequest();
      }
  }
  var xhr = createXMLHttpRequest();
  xhr.open('GET', url, true);  //GET、PUT、OPTIONS、Head、DELETE、TRACE、CONNECT
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  
  xhr.onreadystatechange = function() {
     // readyState == 4说明请求已完成
     if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) { 
        // 从服务器获得数据 
        fn.call(this, xhr.responseText);  
      }
    };
  xhr.send();

```
注释：
1. open(method, url, async) 方法需要三个参数:
method：发送请求所使用的方法（GET或POST）；与POST相比，GET更简单也更快，并且在大部分情况下都能用；但是在以下情况中，请使用POST请求：

无法使用缓存文件（更新服务器上的文件或数据库）
向服务器发送大量数据（POST 没有数据量限制）
发送包含未知字符的用户输入时，POST 比 GET 更稳定也更可靠

url：规定服务器端脚本的 URL(该文件可以是任何类型的文件，比如 .txt 和 .xml，或者服务器脚本文件，比如 .asp 和 .php （在传回响应之前，能够在服务器上执行任务）);
async：规定应当对请求进行异步（true）或同步（false）处理；true是在等待服务器响应时执行其他脚本，当响应就绪后对响应进行处理；false是等待服务器响应再执行。
2. send() 方法可将请求送往服务器。
3. onreadystatechange：存有处理服务器响应的函数，每当 readyState 改变时，onreadystatechange 函数就会被执行。
4. readyState：存有服务器响应的状态信息。（更加具体的状态码信息可自行百度）
```
0. 请求初始化（代理已经创建，但还没有调用open（）方法）
1. 服务器连接已经建立（open方法已经被调用）
2. 请求已经被接收（send方法已经被调用，并且头部和状态已经可获得）
3. 请求处理中（responseText 属性已经包含部分数据）
4. 请求已完成，，且响应已就绪（下载操作已完成）
5. responseText：获得字符串形式的响应数据。
6. setRequestHeader()：POST传数据时，用来添加 HTTP 头，然后send(data)，注意请求参数传入的data格式；GET发送信息时直接将参数到拼接到url上就可以，比如url?name=xiaoming&age=18。

```
## 二.利用jQuery实现ajax方法

Ajax 即“Asynchronous Javascript And XML”（异步 JavaScript 和 XML），是指一种创建交互式、快速动态网页应用的网页开发技术，无需重新加载整个网页的情况下，能够更新部分网页的技术，俗称的局部刷新。
Ajax 的核心就是应用了 XMLHttpRequest 对象，通过这个对象，就可以实现在不重载页面的情况与 Web 服务器交换数据，即在不需要刷新页面的情况下，就可以产生局部刷新的效果。
随着 Jquery 的出现，前端向后端发送请求的方式也逐渐简单了起来，Jquery库内部对AJAX进行了封装。
```js
$.ajax({
  type: "POST",   
  url: url,
  data: data,
  dataType: dataType,
  success: function () {},
  error: function () {},
});
```
## 三. axios请求方式

Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。和jQuery一样都对原生的请求的方式进行封装，通过加入promise方法解决了回调的问题，提供了大量的API。

```js
  axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

```
axios以下优点:

- 支持 Promise API；
- 能够拦截请求和响应；
- 能够转换请求和响应数据；
- 客户端支持防御 CSRF 攻击；
- 同时支持浏览器和 Node.js 环境；
- 能够取消请求及自动转换 JSON 数据。
- 提供了一些并发请求的接口

## 四. Fetch请求方式

Fetch API提供了一个 JavaScript 接口，用于访问和操纵 HTTP 管道的一些具体部分，例如请求和响应。它还提供了一个全局 fetch() 方法，该方法提供了一种简单，合理的方式来跨网络异步获取资源。
这种功能以前是使用 XMLHttpRequest 实现的。Fetch 提供了一个更理想的替代方案，可以很容易地被其他技术使用，例如  Service Workers。Fetch 还提供了专门的逻辑空间来定义其他与 HTTP 相关的概念，例如 CORS 和 HTTP 的扩展。
### 请注意，fetch 规范与 jQuery.ajax() 主要有三种方式的不同：

- 当接收到一个代表错误的 HTTP 状态码时，从 fetch() 返回的 Promise 不会被标记为 reject， 即使响应的 HTTP 状态码是 404 或 500。相反，它会将 Promise 状态标记为 resolve （但是会将 resolve 的返回值的 ok 属性设置为 false ），仅当网络故障时或请求被阻止时，才会标记为 reject。
- fetch() 可以不会接受跨域 cookies；你也可以不能使用 fetch() 建立起跨域会话。其他网站的 Set-Cookie 头部字段将会被无视。
- fetch 不会发送 cookies。除非你使用了credentials 的初始化选项。（自 2017 年 8 月 25 日以后，默认的 credentials 政策变更为 same-origin。Firefox 也在 61.0b13 版本中进行了修改）

```js
 fetch(url, {
  method: 'POST', // or 'PUT'
  body: JSON.stringify(data), // data can be `string` or {object}!
  headers: new Headers({
    'Content-Type': 'application/json'
  })
}).then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => console.log('Success:', response));

```
从上面可以看到，fetch请求在第一个then返回的并不是我们所需要json数据，还是需要调用json()方法。
## ajax、jQuery、Feach、Axios之间对比

- ajax自然不必说，最早出现的发送后端请求技术，隶属于原始js中，核心使用XMLHttpRequest对象，多个请求之间如果有先后关系的话，就会出现回调地狱。
jQuery Ajax：是jQuery框架中的发送后端请求技术，由于jQuery是基于原始的基础上做的封装，所以，jquery Ajax自然也是原始ajax的封装
- fetch号称是AJAX的替代品，是在ES6出现的，使用了ES6中的promise对象。Fetch是基于promise设计的。Fetch的代码结构比起ajax简单多了，参数有点像jQuery ajax。但是，一定记住fetch不是ajax的进一步封装，而是原生js。Fetch函数就是原生js，没有使用XMLHttpRequest对象。
- axios不是原生JS的，需要进行安装或者通过间接引入方式使用，它不带可以在客户端使用，也可以在nodejs端使用。Axios也可以在请求和响应阶段进行拦截。同样也是基于promise对象的。具体参照axios的概念

::: right
来自 [掘金](https://juejin.cn/post/6930903529712254989)
:::