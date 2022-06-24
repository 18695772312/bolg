---
title: 同一浏览器登录不同账号，覆盖token导致数据错乱的解决办法
date: 2022-06-24
categories: javaScript
tags:
 - js
 - Vue
---

## 背景

当用户登录后一般从接口获取的token会存在前端，目前存储地方是本地localStorage.
问题：当用户登录一个账号之后，再打开新的窗口，登录另一个账号，此时本地的token将被覆盖，在没刷新的情况下去第一个登录账号的账号操作时，此时和后端交互的token将是第二个账号的token，这样就会出现数据串掉的问题。

## 为什么存localStorage，而不存sessionStore？

1. localStorage：本地缓存，没有时间限制，将一直缓存在本地。
2. sessionStorage：会话缓存，即浏览器关闭的时候清除缓存数据。
有个情况要注意，退出的时候要记得清除缓存，不然本地会一直保留

## 前端解决思路

监听浏览器是否打开新窗口。监听token是否变化，一旦检测到变化，更新。

1. vue的watch检测不要浏览器的本地的数据变化，所以我们可以放在vuex中

2. 入口文件-新窗口监听事件

```js
window.addEventListener('visibilitychange', () => {
    if (document.hidden === false && store.state.global.token !== localStorage.getItem('token')) {
        store.commit('SET_GLOBAL', { token: localStorage.getItem('token') });
    }
});
```
3.在全局组件监听token变化，实时更新数据

```js
    watch: {
        '$store.state.global.token': {
            handler() {
                this.$router.push('/index');
                this.getInit();
                this.getNoticeList();
                this.getHelpList();
                this.getPolicyList();
            }
        }
    },
    // 注意：不能用reload()刷新这样vuex的数据就没有了，就 会导致页面watch多次触发

```
总结： 这样子就可以实现直接同一浏览器不同窗口登录不同账号时候避免数据的相互污染，说白了就是一个浏览器同时只能允许一个账号的在线。
