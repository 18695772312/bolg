---
title: get请求遇到特殊字符如何解决
date: 2022-05-06
categories:
 - javaScript
tags:
 - js
---

在讲get请求遇到特殊字符传参情况下会报错的问题前，我们先了解下get请求，GET 是指完整请求一个资源。
它的特点是：
1. 使用 url 或者 cookie 传参
2. 提交的数据长度有限制
3. 参数明文显示在浏览器地址栏中（不够安全）
4. GET 请求是幂等性的（幂等性：一次和多次请求某一个资源应该具有同样的副作用。对于 GET 而言，意味着对同一个 url 的多个请求应该返回同样的结果。）
5. GET 产生一个 tcp 数据包，POST 产生两个 tcp 数据包。

### 当我们在用get请求时，以特殊字符作为参数时，会报错的原因是。get请求的参数是拼接在url后面。 在 url 中，诸如字母问号 ? 、与运算符号 & 、井号 # 这样的字符属于保留字符，即它们在 url 中具有特定意义：

- ?：分隔 url 和查询参数
- &：分隔参数
- #：指定书签和锚点
  
### 因此，当 url 中的参数以这些字符开头时，参数的解析会在这些字符的位置被中断，从而将对应变量传入的参数值解析为空。

解决办法：对参数进行转义

```js
// encodeURIComponent() 函数可把字符串作为 URI 组件进行编码。
var uri="https://www.runoob.com/my test.php?name=ståle&car=saab";
document.write(encodeURIComponent(uri));

// 对参数进行转义

if (method === 'get') {
    Object.keys(params).forEach(key => {
        params[key] = encodeURIComponent(params[key]);
    });
}

// 此时后端也要进行对其参数解析，b不然一样会报错
```
