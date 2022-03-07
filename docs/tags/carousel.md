---
title: Ant Design React 走马灯 一次显示多个slide
date: 2021-03-03
categories: other
tags:
- React
- antd
---

## Carousel走马灯 的使用

查阅antd官网，可以知道其实直接复制他的组件就可以使用了，一个简单的轮播如下：

```js
 <Carousel autoplay>
  <div>1</div>
  <div>2</div>
  <div>3</div>
 </Carousel>
// autoplay就是可以自动切换
```
但是文档并没有很详细的API

![](https://i.loli.net/2021/03/03/sgxbTL3YQpv1MHk.png)

## 若要改变切换的时间和切换下一张上一张怎么做？
```js
// 使用useRef
const albumsRef = useRef(null);

// 上一张
  const handlePrev = () => {
    albumsRef.current.prev()
  }

  // 下一张
  const handleNext = () => {
    albumsRef.current.next()
  }

// 自定义切换按钮
 {/* 上一张 */}
<div className="new-prev" onClick={handlePrev}></div>
<Carousel 
  autoplay
  // 这个属性就可以自定义切换的时间
  autoplaySpeed={5000}
  ref={albumsRef}
>
  <div>1</div>
  <div>2</div>
  <div>3</div>
</Carousel>
{/* 下一张 */}
<div className="new-next" onClick={handleNext}></div>
```
## 那么怎么实现一次显示多个slide

其实antd还有其他的API只是文档没有显示出来，百度了一下

![](https://i.loli.net/2021/03/03/EybYlXdIqjfCm4R.png)

其中有两个可以实现如下的走马灯

![](https://i.loli.net/2021/03/03/m7DBQTtozUhdCuH.png)

`slidesToScroll` // 一页滚动几个

`slidesToShow` //一页展示几个

## 效果图

![](https://i.loli.net/2021/03/03/PRL6tAk8QSimsU7.png)

所以根据上面代码左右切换上下页就定义
```js
<Carousel dots={false} slidesToShow={5} slidesToScroll={5} ref={albumsRef} >

```
