---
title:  微信小程序接入高德地图详解
date: 2021-02-04
categories:
 - 微信小程序
tags:
 - js
 - 微信小程序
 - 高德地图
---

## 首先需要有高德地图的账号，再申请key，一般公司都会提供

- 账号与Key的申请
  1. 注册高德开发者；
  2. 去控制台创建应用；
  3. 获取Key。
   
::: right
 参考文档 [高德地图](https://developer.amap.com/api/wx/summary/)
:::
## 下载并安装微信小程序SDK

解压后得到 amap-wx.js 文件，在创建的项目中，新建一个名为 libs 目录，将 amap-wx.js 文件拷贝到 libs 的本地目录下，完成安装。
::: right
 下载链接 [微信小程序SDK](https://developer.amap.com/api/wx/download)
::: 
## 设置安全通讯域名
为了保证高德小程序 SDK 中提供的功能的正常使用，需要设置安全域名。登录微信公众平台，在 "设置"－>"开发设置" 中设置 request 合法域名，将 https://restapi.amap.com 中添加进去。

## 做好以前的准备后，就可以开始使用搞得地图了
1. 设置 index.wxml 文件。
   
```html
<view class="map_container">
  <map class="map" id="map" longitude="{{longitude}}" latitude="{{latitude}}" scale="14" show-location="true" markers="{{markers}}" bindmarkertap="makertap"></map>
</view>
```
2. 设置 index.wxss 文件
```css
.map_container{
  position: absolute;
  top: 0;
  bottom: 80px;
  left: 0;
  right: 0;
}
.map{
  width: 100%;
  height: 100%;
}
```
3. 设置 index.js 文件
```js
// 引入高德地图脚本
var amapFile = require("../../utils/amap-wx.js"); //如：..­/..­/libs/amap-wx.
// 检索周边的POI
  onLoad: function() {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({key:'高德Key'});
    myAmapFun.getPoiAround({
      success: function(data){
        //成功回调
      },
      fail: function(info){
        //失败回调
        console.log(info)
      }
    })
  },
  // 逆地理编码 通过逆地理编码请求，获取该位置的详细的地址信息，以文本形式显示。运行程序
  // 就是通过获取的经纬度来获取地理位置
  onLoad: function() {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({key:'高德Key'});
    myAmapFun.getRegeo({
      success: function(data){
        //成功回调
      },
      fail: function(info){
        //失败回调
        console.log(info)
      }
    })
  },
```
## 结合微信小程序的内置地图和高德地图实现拖动获取位置的经纬度和详情信息
```html
<!-- 视野改变时，regionchange 会触发两次，返回的 type 值分别为 begin 和 end。 -->
<map 
  id="map"  
  longitude="{{longitude}}" 
  latitude="{{latitude}}" 
  scale="14" //缩放级别，取值范围为3-20
  show-location //显示带有方向的当前定位点  
  bindregionchange="regionchange" //视野发生变化时触发 
>
  <!-- 固定在地图顶部的图标 -->
  <cover-image class="cover-image" src="../../public/imgs/chiose1.png" />
</map>
```

```js
// 拖动定位事件
  regionchange(e) {
    // 地图发生变化的时候，获取中间点，也就是用户选择的位置toFixed
    if (e.type == 'end' && (e.causedBy == 'scale' || e.causedBy == 'drag')) {
      var that = this;
      this.mapCtx = wx.createMapContext("map");
      this.mapCtx.getCenterLocation({
        type: 'gcj02',
        success: res => {
          // 获取到对象配合高德的逆地理位置获取详情信息
          const url = 'https://restapi.amap.com/v3/geocode/regeo?key=高德Key&location=' + res.longitude.toFixed(6) + ',' + res.latitude.toFixed(6); + '&radius=1000&extensions=all';
          // 发起请求
          wx.request({
            url: url,
            success: result => {
              // 得到想要的东西
              // result.data
              // do something
            }
          })
        }
      })
    }
  },
```
## 高德通过关键字得到具体地理位置信息
```js

// keywords通过输入框获取用户输入的关键词
getAddDetail(keywords) {
    var url = 'https://restapi.amap.com/v3/geocode/geo?key=高德Key&address=' + keywords;
    // 发起请求
    wx.request({
      url: url,
      success: (res) => {
        // 获取到想要到信息res.data
        // do something
      }
    })
  },
```