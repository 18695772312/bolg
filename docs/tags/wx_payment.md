---
title:  微信小程序的支付流程
date: 2021-02-04
categories:
 - mini-programs
tags:
 - js
 - 微信小程序
---

## 用户调起微信支付主要流程其实就是:

1. 当用户进入小程序后，首先需要获取到openid,如何获取到openid?

```js
wx.login({
	success: res => {
		// 发送 res.code 到后台换取 openId, sessionKey
		if (res.code) {
			const url = '请求到后端接口地址'
			wx.request({
        url,
        data: {
          code: res.code 
        }
      })
		}
  })
```
2. 有了openid相当于万事具备只欠东风，所以，这时只需等待用户的点击事件了，这里需要有一个支付按钮，点击按钮给服务端发送请求。

```js
// 所需的参数
const params = {
  orderCode: ‘订单号’,
  money: ‘订单的金额’,
  orderID: ‘订单ID’,
  openid: ‘用户openid’
}
wx.request({
  url,
  data: params
})
// 等待数据,成功后
return payment(res.data.data.timeStamp, res.data.data.nonceStr, res.data.data.prepayId, 'MD5', res.data.data.paySign)
```
3. 请求服务端后等待服务端做处理，等待服务端给我的参数时间戳timeStamp,随机字符串nonceStr,统一下单接口返回的 prepay_id 参数值packages,签名类型signType,签名paySign，就可以调用微信支付了

```js
// 微信支付
export function payment(timeStamp,nonceStr,packages,signType,paySign){
  return new Promise((resove, reject) => {
    wx.requestPayment({
      'timeStamp': timeStamp,
      'nonceStr': nonceStr,
      'package': "prepay_id="+packages,
      'signType': signType,
      'paySign': paySign,
      success: function(res){
        resove(res) 
      },
      fail: function(err){
        reject(err)
      }
    })
  }) 
}
// 调用微信支付后，若支付成功会返回res.errMsg == 'requestPayment:ok'

```
> 这里需要注意，支付成功后，有一个完成，点击完成才有回调，所以一般支付成功一般在服务端判断，而前端只做通知。
