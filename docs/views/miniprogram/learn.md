---
title: 小程序api文档学习
date: 2020-04-14
tags:
 - miniprogram
categories:
 - miniprogram
---

## wxml 语法

数据绑定： `{{}}` 形式

列表循环： `wx:for` `wx:for-item` `wx:for-index` `wx:key`

`wx:key` 标明 `diff` 的 `dom` 的关键`key`值,为一固定的不重复的字符串或者数字

一种是循环下每一项`item`中的`key`值，一种是`*this`

条件渲染 `wx:if` `wx:hidden` 和 `vue` 中 `v-if`和`v-show`类似，一个是控制元素的显隐，一个是控制元素是否存在

模板：未使用过

关键字： template 

作用： 在模板中定义代码片段，在不同的地方调用

定义： `<template name="模板名字">xxxxxx</template>`

使用： `<template is="模板名字" data="{xxxxx}"></template>`

`data` 是模板所需的数据

作用域：模板拥有自己的作用域，自己能使用`data`传入的数据以及模板定义文件中定义的`<wxs/>` 模板

引用：

引入文件的方式: `include` 和 `import`

`import` 引入 `template`

`include` 引入除 `template` 及 `wxs` 外的代码

## wxs

存在方式： 1. `wxml`内的 `wxs` 标签下； 2. 后缀为`.wxs`的文件

`wxs`特性： 

1. 每个`wxs`都是一个独立的模块
2. 都有自己独立的作用域
3. 只能通过`module.exports` `AMD`的形式暴露内部的私有变量和方法

语法： `<wxs module="xxx" src="xxxx">`

具体参考微信的`api`方式

## 框架接口

### 小程序App

注册小程序，`obj` 参数，必须在 app.js 中调用 插件不需要

```api
onLaunch              页面初始化只调用一次
onShow                页面切前台
onHide                页面切到后台
onError               错误监听函数  
onPageNotFound        404 page, 可以自定义 
onUnhandledRejection  未处理的 Promise 拒绝事件监听函数
any                   用户可以自定义，会挂载在`this`上
```
`getApp` 获取 `App` 初始化的实例

### 页面

注册小程序页面 `obj`参数, 必须使用声明周期函数

```api
data                页面用到的数据
onLoad              生命周期回调—监听页面加载
onShow              生命周期回调—监听页面显示
onReady             生命周期回调—监听页面初次渲染完成
onHide              生命周期回调—监听页面隐藏
onUnload            生命周期回调—监听页面卸载
onPullDownRefresh   监听用户下拉动作
onReachBottom       页面上拉触底
onShareAppMessage   页面转发  
onPageScroll        页面滚动触发
onResize            页面尺寸变化
onTabItemTap        tab页面点击tab触发
any                 用户可以自定义，会挂载在当前页面的`this`上
```

内置属性及方法

1. `Page.route`     当前页面的路径
2. `Page.setDate`   修改data的值，并同步视图的更新`(key, callback)`, `callback`为视图更新后的回调函数

单次设置的数据不能超过`1024kB`，请尽量避免一次设置过多的数据。

页面间的通信

前提条件: 页面通过 `wx.navigateTo` 打开，这两个页面间将建立一条数据通道

被打开的页面可以通过 `this.getOpenerEventChannel()` 方法来获得一个 `EventChannel` 对象；

`wx.navigateTo` 的 `success` 回调中也包含一个 `EventChannel` 对象。

这两个 `EventChannel` 对象间可以使用 `emit` 和 `on` 方法相互发送、监听事件。

### 自定义组件

1. Component
2. Behavior

### 模块化

引入：`require`   `module.exports` 及 `exports`

导出：`module.exports xxx`;  `exports xxx`

### 基础功能

`wx.env` 小程序的环境变量

### 路由

```
switchTab       跳转tabBar
reLaunch        关闭所有界面，打开当前界面
redirectTo      关闭当前页面，打开新界面
navigateTo      隐藏当前界面，打开新的界面
navigateBack    关闭当前界面，返回上一页面或多级页面
EventChannel    页面之间通信通道，仅限于wx.navigateTo方式打开的页面

emit 派发 on 监听 once 监听一次 off 取消监听 [观察者模式]
```

### 开放接口

```
wx.login                                    获取code值
wx.checkSession                             检查code值是否失效
wx.navigateToMiniProgram                    打开另一个小程序
wx.navigateBackMiniProgram                  返回上一个小程序
wx.getAccountInfoSync                       小程序的账号信息
wx.getUserInfo                              获取用户的信息
wx.chooseAddress                            获取用户的收货地址
wx.checkIsSupportSoterAuthentication        获取本机支持的生物验证
wx.startSoterAuthentication                 开启生物验证
wx.checkIsSoterEnrolledInDevice             当前设备是否录入生物信息
wx.getWeRunData                             获取用户的微信运动
wx.requestSubscribeMessage                  订阅模板消息
wx.showRedPackage                           拉起H5领取红包封面页面
```

### 原生组件

1. 原生组件层级最高，无法覆盖原生组件
2. 无法在`pick-view`中使用
3. 原生组件的事件监听不能使用 `bind:eventname` 的写法，只支持 `bindeventname`
4. 部分css无法应用在原生组件

### 开放能力
```
ad                  banner广告
official-account    公众号关注组件
open-data           用于展示微信开放的数据
web-view            网页                        重点，webview

使用JS-SDK可以返回下程序页面
<!-- <script type="text/javascript" src="https://res.wx.qq.com/open/js/jweixin-1.3.2.js"></script> -->
```

### 媒体组件

```
map                地图
audio              音频
video              视频
camera             相机
image              图片
live-player        实时音视频播放
live-pusher        实时音视频录制

背景音频
录音
富文本
音视频合成
WebGL 画面录制器 2.11.0
视频解码器       2.11.0
```

### 文件

本地文件存储的大小限制为 10M

### 开放接口

```
1.) 登录
2.) 小程序跳转
3.) 账号信息
4.) 用户信息
5.) 数据上报
6.) 数据分析
7.) 支付
8.) 授权
9.) 设置
10.) 收货地址
11.) 卡劵
12.) 发票
13.) 生物认证
14.) 微信运动
15.) 性能
16.) 订阅消息  **重要**
17.) 微信红包
```

### 设备

```
1.) BLE & 经典蓝牙
2.) 联系人
3.) 电量
4.) 剪切板
5.) NFC
6.) 网络
7.) 屏幕
8.) 电话
9.) 加速计
10.) 设备方向
11.) 陀螺仪
12.) 性能
13.) 扫码
14.) 振动
15.) 3D three.js
```

### 小程序自动化&组件单元测试

暂时不会

### 小程序分包

1.) 在`app.json`的`subpackages`中声明

```json
subpackages: [
    {
        root: "", //分包根目录
        name: "", // 分包别名，预下载时使用
        pages: [], // 页面
        independent: Boolean // 是否为独立分包
    }
]
```

2.) 从独立分包下进入小程序，不需要下载主包，从普通分包进来，需要下载主包

3.) 分包预下载，预下载分包行为在进入某个页面时触发，通过在 app.json 增加 preloadRule 配置来控制。

```json
packages  // 进入页面后预下载分包的 root 或 name。__APP__ 表示主包。
network   // 在指定网络下预下载，可选值为：all: 不限网络 wifi: 仅wifi下预下载

"preloadRule": {
    "pages/index": {
      "network": "all",
      "packages": ["important"]   // 下载一个分包
    },
    "sub1/index": {
      "packages": ["hello", "sub3"]  // 下载多个分包
    },
    "indep/index": {
      "packages": ["__APP__"]   // 下载主包
    }
  }
```