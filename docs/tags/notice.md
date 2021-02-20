---
title: 纯CSS实现的三种通知栏滚动效果
date: 2021-02-20
author: 橙某人
categories: css
tags:
- css
---

## 第一种

HTML部分
```html
<div class="notice">
    <div class="notice__inner">
        <div class="notice__box">
            <div class="notice__item">恭喜会员用户&nbsp;<span style="color: red;">橙某人</span>&nbsp;中奖</div>
            <div class="notice__item">恭喜会员用户&nbsp;<span style="color: red;">小密圈圈</span>&nbsp;中奖</div>
            <div class="notice__item">恭喜会员用户&nbsp;<span style="color: red;">Cooke_</span>&nbsp;中奖</div>
            <div class="notice__item">恭喜会员用户&nbsp;<span style="color: red;">爱音乐网站</span>&nbsp;中奖</div>
            <div class="notice__item">恭喜会员用户&nbsp;<span style="color: red;">青年之声</span>&nbsp;中奖</div>
            <div class="notice__item">恭喜会员用户&nbsp;<span style="color: red;">仙人</span>&nbsp;中奖</div>
            <div class="notice__item">恭喜会员用户&nbsp;<span style="color: red;">三十万人编号</span>&nbsp;中奖</div>
            <div class="notice__item">恭喜会员用户&nbsp;<span style="color: red;">Maboroshii</span>&nbsp;中奖</div>
            <div class="notice__item">恭喜会员用户&nbsp;<span style="color: red;">陈亚明</span>&nbsp;中奖</div>
            <div class="notice__item">恭喜会员用户&nbsp;<span style="color: red;">老娘终于发达了</span>&nbsp;中奖</div>
        </div>
        <div class="notice__box">
            <div class="notice__item">恭喜会员用户&nbsp;<span style="color: red;">橙某人</span>&nbsp;中奖</div>
            <div class="notice__item">恭喜会员用户&nbsp;<span style="color: red;">小密圈圈</span>&nbsp;中奖</div>
            <div class="notice__item">恭喜会员用户&nbsp;<span style="color: red;">Cooke_</span>&nbsp;中奖</div>
            <div class="notice__item">恭喜会员用户&nbsp;<span style="color: red;">爱音乐网站</span>&nbsp;中奖</div>
            <div class="notice__item">恭喜会员用户&nbsp;<span style="color: red;">青年之声</span>&nbsp;中奖</div>
            <div class="notice__item">恭喜会员用户&nbsp;<span style="color: red;">仙人</span>&nbsp;中奖</div>
            <div class="notice__item">恭喜会员用户&nbsp;<span style="color: red;">三十万人编号</span>&nbsp;中奖</div>
            <div class="notice__item">恭喜会员用户&nbsp;<span style="color: red;">Maboroshii</span>&nbsp;中奖</div>
            <div class="notice__item">恭喜会员用户&nbsp;<span style="color: red;">陈亚明</span>&nbsp;中奖</div>
            <div class="notice__item">恭喜会员用户&nbsp;<span style="color: red;">老娘终于发达了</span>&nbsp;中奖</div>
        </div>
    </div>
</div>

```
CSS部分
```css
.notice{
    width: 300px;
    height: 300px;
    border-radius: 8px;
    border: 1px solid #eee;
    margin: 100px auto;
}
.notice__inner{
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-size: 14px;
    color: #666;
}
.notice__box{
    animation: roll 10s linear infinite;
}
.notice__item{
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding: 0 12px;
    white-space: nowrap;
}
@keyframes roll {
    0% {
        transform: translateY(0);
    }
    100% {
        transform: translateY(-300px);
    }
}

```
![avatar](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/938c599c308643488f026c9325870782~tplv-k3u1fbpfcp-watermark.image)
## 第二种

HTML部分
```html
<div class="notice">
    <div class="notice__inner">
        <div class="notice__item">HTTP升级HTTPS全过程，Nginx配置平滑升级</div>
        <div class="notice__item">一台电脑存在多个版本的Vuecli，方便快速初始化不同版本的Vue项目</div>
        <div class="notice__item">前端模块化规范定义-不同规范下的导入导出</div>
        <div class="notice__item">快速、简洁讲明Vue中v-for循环key的作用</div>
        <div class="notice__item">Call与Apply函数的分析及手写实现</div>
        <div class="notice__item">普通切图仔的一年 | 掘金年度征文</div>
        <div class="notice__item">前端需要了解的浏览器缓存（即HTTP缓存）| 🏆 技术专题第八期征文</div>
    </div>
</div>

```
CSS部分
```css
.notice{
    width: 600px;
    height: 40px;
    border-radius: 8px;
    border: 1px solid #eee;
    margin: 100px auto;
    overflow: hidden;
}
.notice__inner{
    animation: roll 36s linear infinite;
    margin-top: 0
}
.notice__item{
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    padding: 0 12px;
    white-space: nowrap;
    text-decoration: underline;
}
@keyframes roll {
    0% {
        margin-top: 0;
    }
    4% {
        margin-top: 0;
    }
    8% {
        margin-top: 0;
    }
    12% {
        margin-top: -40px;
    }
    16% {
        margin-top: -40px;
    }
    20% {
        margin-top: -80px;
    }
    24% {
        margin-top: -80px;
    }
    28% {
        margin-top: -120px;
    }
    32% {
        margin-top: -120px;
    }
    36% {
        margin-top: -160px;
    }
    40% {
        margin-top: -160px;
    }
    44% {
        margin-top: -200px;
    }
    48% {
        margin-top: -200px;
    }
    52% {
        margin-top: -240px;
    }
    56% {
        margin-top: -240px;
    }
    60% {
        margin-top: -200px;
    }
    64% {
        margin-top: -200px;
    }
    68% {
        margin-top: -160px;
    }
    72% {
        margin-top: -160px;
    }
    76% {
        margin-top: -120px;
    }
    80% {
        margin-top: -120px;
    }
    84% {
        margin-top: -80px;
    }
    88% {
        margin-top: -80px;
    }
    92% {
        margin-top: -40px;
    }
    96% {
        margin-top: -40px;
    }
    100% {
        margin-top: 0;
    }
}

```

![avatar](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4c562c9e5bcd47ebad86ebd837fccd1b~tplv-k3u1fbpfcp-watermark.image)

这种轮播的形式是比较常见的一种，也是比较实用完善简单的一种，随便提一句在微信小程序上用swiper组件去实现比较简单快捷（不要问我怎么知道的-.-）。

- `视口容器`高度需要固定，超出视口容器隐藏内容；
- 通过移动内层margin-top实现滚动效果（用translateY也一样，全部替换一下就行）；
- 需要注意的是，从上面HTML部分知道我有七个通知内容，所以在@keyframes中的margin-top是移动七次而已，之后就回走，如果添加了第八个通知内容，我们要对应调整其中的数值；

## 第三种
HTML部分
```html
<div class="notice">
    <div class="notice__inner">
        <span class="notice__item notice__item-first">Vue是一个渐进式的 JavaScript 框架</span>
        <span class="notice__item notice__item-second">Vue是一个渐进式的 JavaScript 框架</span>
    </div>
</div>

```
CSS部分
```css
.notice{
    width: 600px;
    height: 40px;
    border-radius: 8px;
    border: 1px solid #eee;
    margin: 100px auto;
    overflow: hidden;
}
.notice__inner{
    height: 100%;
    font-size: 14px;
    color: #333;
    line-height: 40px;
    white-space: nowrap;
    position: relative;
}
.notice__item{
    position: absolute;
    top: 0;
    left: 100%;
    height: 100%;
}
.notice__item-first{
    padding-right: 70%;
    animation: rollFirst 25s linear infinite;
}
.notice__item-second{
    padding-right: 53%;
    animation: rollSecond 25s linear 12s infinite;
}
@keyframes rollFirst {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-200%);
    }
}
@keyframes rollSecond {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-200%);
    }
}

```
![avatar](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3c7d31ced7d343dab58d8d445a7a47b6~tplv-k3u1fbpfcp-watermark.image)

这种滚动通知栏也是比较常见的一种，它比较麻烦的一点就是那个空白间隔不好控制，特别在多个通知内容的时候，当然用JS还是比较好实现的，现在也有很插件可以直接开箱就用啦。

- 这种视口容器高度就不需要固定了，它并不依赖，超出视口容器隐藏内容；
- 利用padding-right来制造空白间隔，以百分比为单位；
- 内容需要准备两份，通过animation-delay来延时第二份内容的出现，这里也有另一个思路就是直接来移动内层容器的translateX，与第一种是一样的道理；

::: right
来自 [掘金](https://juejin.cn/post/6930436514480390152)
:::