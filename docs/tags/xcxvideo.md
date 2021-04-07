---
title: 小程序轮播使用视频播放，解决安卓机会挡住的问题
date: 2021-04-07
categories: 微信小程序
tags:
- 微信小程序
---

## HTML

```html
    <swiper class="swiper" indicator-color="#fff" indicator-active-color="#FFBB16" indicator-dots circular
      current="{{swiperCurrent}}" bindchange="swiperChange" class="swiper">
      <block wx:for="{{imgUrls}}" wx:key="index">
        <swiper-item wx:if="{{item.images === ''}}" class="vidio">
          <video id="myVideo" src="{{src}}" autoplay="{{autoplay}}" style="width:100%;height:100%">
            <cover-view wx:if="{{showImg}}">
              <!-- 覆盖图片 -->
              <cover-image class="images" src="{{item.cover}}" mode="widthFix" style="width:100%;"></cover-image>
            </cover-view>
             <!-- 播放按钮 -->
             <cover-image class="play-img" src="/assets/images/icons/play.png" mode="widthFix" style="display:{{!showImg?'none':'block'}}" bindtap="hanldePaly"></cover-image>
          </video>
        </swiper-item>
        <swiper-item class="swiper-item" wx:else>
          <image class="images" src="{{item.images}}" mode="widthFix" />
        </swiper-item>
      </block>
    </swiper>
```
## js代码
```js
// 播放视频
  hanldePaly() {
    const video = wx.createVideoContext('myVideo')
    this.setData({
      src: this.data.detail.video_url,
      showImg: false,
      autoplay:true
    },()=>{
      video.play()
    })
    
  },
```
播放图片定位居中，z-index:999
然后通过图片position:absolute绝对定位，z-index层叠上下文来完成布局，这种方式在ios系统下表现还好，在一些安卓机上图片和按钮就会被video组件覆盖，这是因为video组件是原生组件，使用上有一些限制

所以微信官方提供了cover-view与cover-image组件，可以覆盖原生组件上面。

微信还提功能了const video = wx.createVideoContext()方法可以获得一个video实例，通过video.play()方法来控制播放。

::: right
来自 [参考]](https://juejin.cn/post/6844903768903925768#heading-0)
:::