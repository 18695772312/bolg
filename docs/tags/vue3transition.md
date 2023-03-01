---
title: Vue3 动画
date: 2023-02-01
categories: javaScript
tags:
 - js
 - Vue3
---


## 过度动画

Vue 提供了两个内置组件，可以帮助你制作基于状态变化的过渡和动画：

`Transition` 会在一个元素或组件进入和离开 DOM 时应用动画

`TransitionGroup` 会在一个 v-for 列表中的元素或组件被插入，移动，或移除时应用动画。

::: right
来自 [文档](https://cn.vuejs.org/guide/built-ins/transition.html)
:::

1. `Transition` 是一个内置组件，这意味着它在任意别的组件中都可以被使用，无需注册。它可以将进入和离开动画应用到通过默认插槽传递给它的元素或组件上。进入或离开可以由以下的条件之一触发：

```html
    <button @click="show = !show">Toggle</button>
    <Transition>
    <p v-if="show">hello</p>
    </Transition>
```
```css
/* 下面我们会解释这些 class 是做什么的 */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.v-enter-to,
.v-leave-from {
  opacity: 1;
}
```


## 设置过度和动画

1. vue为了字段过度的完成，内部是在监听 transitionend 或者 animationend，到底使用哪一个取决于元素应用的css规则
   - 如果我们只是使用了其中的一个，那么vue能自动识别类型并设置监听

2. 但是如果我们同时使用了过度和动画，
    - 并且再这个情况下可能`某一个动画执行结束时，另一个动画还没结束`；
    - 在这种情况下，我们可以设置`type属性为 animation 或者 transition `来明确的告知vue监听的类型
  
```html
<Transition type="animation">...</Transition>
```

## 显示的指定动画时间

我们可以显示的来指定过度时间，通过`duration`属性

```html
<!-- number类型 -->
<Transition :duration="550">...</Transition>
<!-- 对象类型 分开指定进入和离开所需的时间 -->
<Transition :duration="{ enter: 500, leave: 800 }">...</Transition>

```
## animate.css库的使用

- 安装animate.css 

```js
npm install animate.css
```
- 在main.js中导入

```js
import 'animate.css'
```
