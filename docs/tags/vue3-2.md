---
title: vue3从入门到精通（二）
date: 2022-02-06
categories: javaScript
tags:
 - Vue
---

# 常用Composition（组合式） API
::: right
来自 [官网](https://v3.cn.vuejs.org/guide/composition-api-introduction.html)
:::

## 1. 拉开序幕的setup
   1. 理解：Vue3.0中一个新的配置项，值为一个函数。
   2. setup是所有`Composition Api(组合API)`“表演的舞台”。
   3. 组件中所用到的：数据、方法等等，均要配置再setup中。
   4. setup函数的两种返回值：
      1. 若返回一个对象，则对象中的属性、方法，再模板中均可以直接使用。
      2. 若返回一个渲染函数：则可以自定义渲染内容。

   5. 注意点：
      1. 尽量不要于vue2.x配置混用
        * vue2.x配置（data、method、computed...）中可以访问到setup的属性、方法。
        * 但在setup中不能访问到vue2.x配置的（data、method、computed...）。
        * 如果有重名setup优先。

      2. setup不能是一个async 函数，因为返回值不再是return的对象，而是promise，模板看不到return对象中的属性。

```js
// 测试一下setup，不考虑响应式问题
<script>
export default {
  name: 'App',
  setup(){
    //   数据
    let name = '张三'
    let age = 18

    // 方法
    function sayHello(){
        console.log(`我叫${name},今年${age}岁了，你好呀`)
        // 结果 我叫张三,今年18岁了，你好呀
    }
    // 返回对象
    return {
        name,
        age,
        sayHello
    }
    // 返回一个渲染函数
    // return () => h('h1','hello')
  }
}
</script>
```

### setup的两个注意点

* setup执行时机
  * 在beforeCreate之前执行一次，this是undefined。

* setup的参数
  * props：值为对象，包含：组件外部传递过来，且组件内部声明接收了的属性。
  * context：上下文对象
    * attrs:值为对象，包含：组件外部传递过来，但没有在props配置中声明的属性，相当于`this.$attrs`。
    * slots:收到的插槽内容，相当于`this.$slots`。
    * emit:分发自定义时间的函数，相当于`this.$emit`
## 2. 响应式 ref
* 作用：定义一个响应式的数据
* 语法： const a = ref(initValue)
      * 创建一个包含响应式的引用对象。
      * js中操作数据：a.value
      * 模板中读取数据：不需要.value,直接`<div>{ {a} }</div>`

* 备注：
      * 接收的数据可以是基本类型、对象类型。
      * 基本类型的数据：响应式依然是靠Object.defineProperty()的get于set完成的。
      * 对象类型的依据的数据：内部求助了Vue3.0中的一个新的函数 ---reactive。

```js
<script>
import { ref } from 'vue'
export default {
  name: 'App',
  setup(){
    //   数据
    let name = ref('张三') // ref加工完的是一个对象。拆分单词 reference （引用）implement（实现）
    let age = ref(18)
    let job = ref({
        type: '前端',
        salary: '30k'
    })

    // 方法
    function sayHello(){
        // 响应式改变数据
        name.value = '李四'
        name.age = 22
        job.value.type = 'Java工程师'
        job.value.salary = '60k'
    }
    // 返回对象
    return {
        name,
        age,
        job,
        sayHello
    }
  }
}
</script>
```
## 3. reactive函数
* 作用：定义一个`对象类型`的响应式数据（基本类型别用他，用ref）
* 语法：`const 代理对象 = reactive(被代理对象) `接收一个对象（或数组），返回一个`代理器对象（proxy对象）`
* reative定义的响应式数据是“深层次的”。
* 内部基于ES6的Proxy实现，通过代理对象操作源对象内部数据都是响应式的

```js
<script>
import { reactive } from 'vue'
export default {
  name: 'App',
  setup(){
    //   数据
    let job = reactive({
        type: '前端',
        salary: '30k',
        a: {
            b: {
                c: 666
            }
        }
    })
    let hobby = reactive(['吃饭','睡觉','打豆豆'])
    // 方法
    function sayHello(){
        // 响应式改变数据
        job.type = 'Java工程师'
        job.salary = '60k'
        job.a.b.c = 999  // 深层次的
        hobby[0] = '学习'  
    }
    // 返回对象
    return {
        job,
        hobby,
        sayHello
    }
  }
}
</script>
```



## 4. Vue3.0中的响应式原理

### vue2.x的响应式
* 实现原理：
  * 对象类型： 通过`Object.defineProperty()`对属性的读取、修改进行拦截（数据劫持）。
  * 数组类型：通过重写更新数组的一系列方法实现拦截。（对数组的变更方法进行包裹）。

    ```js
    Object.defineProperty(data, 'count', {
        get() {},
        set() {}
    })
    ```

* 存在问题：
  * 新增属性、删除属性、界面不会更新。
  * 直接通过下标修改数组，界面不会自动更新。

### vue3.0的响应式
* 实现原理
  * 通过proxy（代理）：拦截对象中任意属性的变化，包括：属性的读写、属性的添加，属性的删除等。
  * 通过reflect（反射）：对被代理 属性进行操作。
```js
let person = {
    name: '张三',
    age：18 
}
const p = new Proxy(person,{
    // 有人读取p的某个属性时调用
    get(target,proName){
        // target就是传入的person，proName就是调用谁就是谁
        return target[proName]
    },
    // 有人新增或修改p的某个属性时调用
    set(target,proName,value){
        target[proName] = value
    },
    // 有人删除p的某个属性时调用
    deleteProperty(target,proName){
      return delete target[proName]
    }
})
// vue3.0中的写法
const p = new Proxy(person,{
    // 有人读取p的某个属性时调用
    get(target,proName){
        // target就是传入的person，proName就是调用谁就是谁
        return Reflect.get(target,proName)
    },
    // 有人新增或修改p的某个属性时调用
    set(target,proName,value){
       Reflect.set(target,proName,value)
    },
    // 有人删除p的某个属性时调用
    deleteProperty(target,proName){
      return Reflect.deleteProperty(target,proName)
    }
})
```
## 5. reactive对比ref
* 从定义数据的角度对比
  * ref用来定义：基本类型数据。
  * reactive用来定义：对象（或数组）类型数据。
  * 备注：ref也可以用来定义对象（或数组）数据类型，它内部会自动通过reactive转为代理对象。

* 从原理角度对比：
  * ref通过`Object.defineProperty()`的`get`和`set`来实现响应式。
  * reactive通过Proxy来实现响应式，并通过Reflect操作源对象内部的数据。

* 从使用角度对比：
  * ref定义的数据，操作数据需要`.vale`，读取数据时模板直接读取不需要`.vale`。
  * reactive定义的数据：操作数据于读取均不要`.vale`。
## 6. vue3.0中的计算属性和监视
### 1. computed函数

* 和vue2.x中的computed配置功能一致。
* 写法：
  ```js
  import { computed } from 'vue'
  setup() {
      ...
      // 计算属性---简写（不考虑读写）
      let fullName = computed(() => {
          return person.firstName + '-' + person.lastName
      })
      // 计算属性 --- 完整
      let fullName = computed(() => {
          get() {
            return person.fristName  + '-' + person.lastName
          },
          set(value) {
              const nameArr = value.split('-')
              person.firstName = nameArr[0]
              person.lastName = nameArr[1]
          }
      })
  }
  ```
  ### 2. watch函数
  ```js
  import {ref, watch, reactive} from 'vue'
  setup() {
      let sum = ref(0)
      let msg = ref('hello')
      let person = reactive({
          name: '张三',
          age: 18,
          job: {

          }
      })
      // 情况一，监视ref所定义的一个响应式数据
      watch(sum, (newValue, oldValue) => {
          console.log(newValue, oldValue)
      }, { immediate: true })
      // 情况二，监视ref所定义多个响应式数据
      watch([sum, msg],  (newValue, oldValue) => {
          console.log(newValue, oldValue)
      }, { immediate: true })
      // 情况三，监视reactive所定义的一个响应数据，注意，这里无法正确获取oldValue，强制开启了深度监视，（deep配置无效）
      watch(person, (newValue, oldValue)
          console.log(newValue, oldValue)
      })
      // 情况四：监视reactive所定义的一个响应式数据中某个属性
      watch(() => person.name,  (newValue, oldValue)
          console.log(newValue, oldValue)
      })
      // 情况五，监视reactive所定义的一个响应数据中的某些属性
      watch([() => person.name, () => person.age],  (newValue, oldValue)
          console.log(newValue, oldValue)
      })
      // 特殊情况
      watch(() => person.job,() => (newValue, oldValue)
          console.log(newValue, oldValue)
      }), { deep: true }) // 此处由于监视的是reactive所定义的对象中的某个属性，所以deep配置有效
      return {
          sum,
          msg
      }
  }
  ```
 ### 3. watchEffect函数
 * watch的套路是：既要声明监视的属性，也要指明监视的回调。
 * watchEffect的套路是：不用指明监视哪个属性，监视的回调中用到哪个属性，就监视哪个属性。
 * watchEffect有点像computed：
   * 但computed注重的计算出来的值（回调函数的返回值），所以必须写返回值。
   * 二watchEffect更注重的是过程（回调函数的函数体），所以不用写返回值

```js
// watchEffect所有指定的回调用的数据只要发生变化，则直接重新执行回调。
watchEffect(() => {
    const x1 = sum.value
    const x2 = person.age
    console.log('watchEffect配置的回调执行了')
})
```
