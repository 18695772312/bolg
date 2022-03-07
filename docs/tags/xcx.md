---
title: 小程序复制内容到剪贴板和点击拨打电话
date: 2021-04-07
categories: 微信小程序
tags:
- 微信小程序
---

## 复制内容到剪贴板

```js
wx.setClipboardData({
  data: 'data',
  success (res) {
    wx.getClipboardData({
      success (res) {
        console.log(res.data) // data
      }
    })
  }
})
```
::: right
来自 [微信开发文档](https://developers.weixin.qq.com/miniprogram/dev/api/device/clipboard/wx.setClipboardData.html)
:::

## 点击拨打电话

```js
wx.makePhoneCall({
  phoneNumber: '1340000' //仅为示例，并非真实的电话号码
})
```
::: right
来自 [微信开发文档](https://developers.weixin.qq.com/miniprogram/dev/api/device/phone/wx.makePhoneCall.html)
:::