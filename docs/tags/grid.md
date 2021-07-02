---
title: grid布局 入门
date: 2021-07-02
categories: css
tags:
- css
---


grid布局是二维空间，虽然和flex有点像，但是grid会更强大，因此会更难一点

## 基本概念

首先要了解grid还是得从flex入手，如果知道flex布局的就应该对容器和项目比较清楚，grid中也容器和项目。

```html
<!-- 容器 -->
 <div class="container"> 
     <!-- 项目 -->
    <div class="item item-1">1</div>
    <div class="item item-2">2</div>
    <div class="item item-3">3</div>
    <div class="item item-4">4</div>
    <div class="item item-5">5</div>
    <div class="item item-6">6</div>
    <div class="item item-7">7</div>
    <div class="item item-8">8</div>
    <div class="item item-9">9</div>
  </div>

```
## 容器里面的水平区域称为"行"（row），垂直区域称为"列"（column）。



```css
.container{
    display: grid;
    width: 600px;
    height: 600px;
    border: 10px solid blue;
    /* 定义一个三行三列宽为100px的九宫格 */
    grid-template-columns: 100px 100px 100px;
    /* 另一种写法 */
    grid-template-columns: repeat(3,100px);
    /* 每列宽度100px，然后自动填充，直到容器不能放置更多的列。 */
    grid-template-columns: repeat(auto-fill, 100px);
    /* 两个相同宽度的列 */
    grid-template-columns: 1fr 1fr;
    /* 第一列的宽度为150像素，第二列的宽度是第三列的一半 */
    grid-template-columns: 150px 1fr 2fr;
    /* 1fr 宽度平均分配 */
    grid-template-columns: repeat(3,1fr); 
    /* 行间距 row-gap*/
    row-gap: 20px;
    /* 列间距 */
    column-gap: 20px;
    /* 上面间距组合写法 */
    gap: 20px;
    /* 项目水平 */
    justify-items: center;
    /* 项目垂直 */
    align-items: center;
    /* 上面组合 */
    place-items: center center;
}
```
## minmax()  函数产生一个长度范围，表示长度就在这个范围之中。它接受两个参数，分别为最小值和最大值。

```css
/* 表示列宽不小于100px，不大于1fr */
grid-template-columns: 1fr 1fr minmax(100px, 1fr);
```

## auto 表示由浏览器自己决定长度

```css
/* 双飞翼布局，左右100px,中间区域自适应 */
grid-template-columns: 100px auto 100px;
```
## grid-template-areas 属性  （区域瓜分）
```css
.container {
    display: grid;
    grid-template-columns: 100px 100px 100px;
    grid-template-rows: 100px 100px 100px;
    /* 先划分出9个单元格，然后将其定名为a到i的九个区域，分别对应这九个单元格 */
    grid-template-areas: 'a b c'
                         'd e f'
                         'g h i';
    /* 将9个单元格分成a、b、c三个区域 */
    grid-template-areas: 'a a a'
                         'b b b'
                         'c c c';
}
```
## grid-area 属性 指定项目放在哪一个区域

```css
/* 把项目1放在e区域位置 */
.item-1 {
  grid-area: e;
}
```

## grid-auto-flow 对齐顺序 （默认row）默认的放置顺序是"先行后列"，即先填满第一行，再开始放入第二行。
```css
.container{
    /* "先列后行" */
    grid-auto-flow: column;
    /* "先行后列"，并且尽可能紧密填满，尽量不出现空格 剩下的项目自动放置*/
    grid-auto-flow: row dense;
}
```

## 项目占比

```css
.item-1{
      background-color: blueviolet;
      /* 左边框所在的垂直网格线1,右边框所在的垂直网格线3 */
      grid-column: 1/3;
      /* 左边框所在的垂直网格线1, */
      grid-column-start: 1;
      /* 右边框所在的垂直网格线3 */
      grid-column-end: 3;
      /* 上边框所在的水平网格线1，下边框所在的水平网格线3 */
      grid-row: 1/3;
      /* 跨域，跨两个单元格 */
      grid-column-start: span 2;
      /* 自己居中对齐 */
      justify-self: center;
    }
```
