---
title: vue3从入门到精通（三）
date: 2022-02-07
categories: javaScript
tags:
 - Vue
---
## vue3.0生命周期

![vue3.jpg](https://img-blog.csdnimg.cn/img_convert/07a6f5c06eb68aa37860b12ec7744e60.png#pic_center)

 vue3.0 提供 组合式API形式的生命周期钩子
 * beforeCreat ===> setup()
 * ceated ====> setup()
 * beforeMount ====> 	onBeforeMount
 * mounted	====> onMounted
 * beforeUpdate	====> onBeforeUpdate
 * updated	====> onUpdated
 * beforeUnmount	====> onBeforeUnmount
 * unmounted	====> onUnmounted

```js
 setup() {
    // mounted
    onMounted(() => {
      console.log('Component is mounted!')
    })
  }
```
## 自定义hook函数

* 什么是hook? ------ 本质是一个函数，把setup函数中使用的Composition API进行了封装。
* 类似于vue2.x中的mixin。
* 自定义hook的优势复用代码，让setup中逻辑更加清楚易懂。

1. src下新建文件夹hooks
hooks文件夹放着封装的函数
usePoint.js
```js
import {reactive, onMounted, onBeforeUnmounted} from 'vue'
export default function() {
    // 实现鼠标打点相关数据
    let point = reactive({
        x: 0,
        y: 0
    })
    // 实现鼠标打点的相关方法
    function savePoint(e) {
        point.x = e.pageX
        point.y = e.pageY
    }
    // 实现鼠标带单相关生命周期钩子
    onMounted(() => {
        window.addEventListener('click', savaPoint)
    })
    onBeforeUnmounted(() => {
        window.removeEventListener('click', savaPoint)
    })
}
```
哪里需要这个方法就哪个去引入
```js
import usePoint from '@/hooks/usePoint'
export default {
    name: 'Test',
    setup() {
        const point = usePoint()
        return {
            point
        }
    }
}
```
## toRef
* 作用：创建一个ref对象，其value值指向另一个对象中的某个属性。
* 语法：`const name = toRef(person,'name')`.
* 应用：要将响应式对象中的某个属性单独提供给外部使用时。
* 扩展：`toRefs`和`toRef`功能一致，但可以批量创建多个ref对象，语法：`toRefs(person)`

## shallowReactive 与 shallowRef（了解）

* shallowReactive:只出库对象最外层属性的响应式（浅响应式）
* shallowRef:只处理基本数据类型的响应式，不进行对象的响应式处理。
* 什么时候使用？
  * 如果一个对象数据，结构比较深，但变化时只是外层属性变化，使用shallowReactive。
  * 如果一个对象数据，后续功能不会修改该对象中的属性，而是生成新的对象替换，使用shallowRef

## readonly 与 shallowReadonly

* readonly: 让一个响应式数据变为只读的。（深只读）
* shallowReadonly：让一个响应数据变为只读的。(浅只读)
* 应用场景：不希望数据被修改时。
## toRow 与 markRaw
* toRow
  * 作用：将一个reactive生成的响应试对象转为普通对象
  * 使用场景：用于读取响应式对应的普通对象。对这个普通对象的所有操作，不会引起页面更新。

* markRaw
  * 作用：标记一个对象，使其永远不会再承威响应式对象。
  * 应用场景：
    * 有些值不应该被设置为响应式的，例如复杂的第三方类库等。
    * 当渲染具有不可变数据源大列表时，跳过响应式转换可以提高性能。

## customRef
创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制。它需要一个工厂函数，该函数接收 track 和 trigger 函数作为参数，并且应该返回一个带有 get 和 set 的对象。

使用自定义 ref 通过 v-model 实现 debounce 的示例：
```js
function useDebouncedRef(value, delay = 200) {
  let timeout
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      }
    }
  })
}

export default {
  setup() {
    return {
      text: useDebouncedRef('hello')
    }
  }
}
```
::: right
来自 [官网](https://v3.cn.vuejs.org/api/refs-api.html#customref)
:::
