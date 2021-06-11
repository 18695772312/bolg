---
title:  微信小程序授权登录，授权手机号步骤和详解
date: 2021-02-04
categories:
 - 微信小程序
tags:
 - js
 - 微信小程序
---

> 这里需要注意微信小程序授权信息和授权手机号需要提供两个按钮

## 授权用户信息

- 提供按钮
- 
``` html
<button  
  class="user-btn" 
  open-type="getUserInfo" 
  bindgetuserinfo="getuserinfo" 
  hover-class="btn-hover">
    微信授权
</button>
```
- 点击按钮获取用户信息
```js 
// 点击获取用户是否获取用户信息
  getuserinfo(e) {
    if(e.detail.userInfo != null){
      console.log(e.detail.userInfo) // 用户信息对象
    }
  },
  // 日前微信出了心的api旧的api被废弃，
  // 新api
  wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        const data = {
          avatar: res.userInfo.avatarUrl,
          sex: res.userInfo.gender,
          nickname: res.userInfo.nickName
        }
  })

```
## 授权用户手机号
- 获取微信用户绑定的手机号，需先调用wx.login接口。
> 这里注意，需要用户主动触发才能发起获取手机号接口，所以该功能不由 API 来调用，需用 button 组件的点击来触发。
```html
<button open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber"></button>
```
- 点击按钮发起请求需要服务端对手机解密再返回给前端
```js
 getPhoneNumber (e) {
    console.log(e.detail.errMsg) 
    console.log(e.detail.iv) // 加密算法的初始向量
    console.log(e.detail.encryptedData)//包括敏感数据在内的完整用户信息的加密数据
    // 打包参数请求服务端接口
  }
```