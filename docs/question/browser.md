---
title: 浏览器篇
---


### 移动端你遇到的兼容性问题

1. 安卓软键盘遮挡

```js
Element.scrollIntoView()
```

2. 1px

```js
1px 像素问题 transform scale
```

3. 兼容x系类

```js
meta标签 viewport-fit=cover

@supports (bottom: env(safe-area-inset-top)) {
    padding-bottom: env(safe-area-inset-bottom);
}
@supports (bottom: constant(safe-area-inset-top)) {
    padding-bottom: constant(safe-area-inset-bottom);
}
```




### window.onload & document.ready

window.onload: 在页面资源（比如图片和媒体资源，它们的加载速度远慢于DOM的加载速度）加载完成之后才执行

document.ready: 在DOM树加载完成后执行

也就是说$(document).ready要比window.onload先执行。$(function(){}) 和 $(document).ready(function(){}) 是一个方法，$(function(){})为简写

### 异步

扩展：

线程：是操作系统能够进行运算调度的最小单位。它被包含在进程之中，是进程中的实际运作单位

进程：进程是一个具有一定独立功能的程序在一个数据集上的一次动态执行的过程

js最初的设计是单线程模式，主要用途是与用户互动，以及操作DOM，单线程是为了保证DOM过程中的唯一性，js代码的执行由上而下解析运行，遇到耗时长的方法会等待其返回再继续向下执行，为了更好的和用户进行交互，引入了事件循环机制，将程序分为同步任务和异步任务，异步任务通常用户处理页面耗时较长且暂时不需要立即执行的函数

虽然js是单线程的，但是浏览器是多线程的，常见的线程有GUI渲染线程，JavaScript解析线程，事件处理线程

异步虽然解决了JS因执行耗时长出现程序运行阻塞问题，但是由于很多时候需要在异步响应后进行对应操作，所以为了更好的处理异步有以下解决方案

1. callback
2. Promise
3. async awiat
4. 发布订阅

### 从输入url的地址栏，到页面展示，这中间发生了什么

```
① DNS 解析，获取到服务器的真实IP地址
② 建立TCP 链接
③ 进行HTTP 三次握手、HTTP四次挥手
④ 解析HTML、CSS 分别为DOM tree 和 css Rule Tree
⑤ 构建出 render tree
⑥ 根据 render tree 进行布局

layout 回流 根据render tree, 进行回流，得到元素节点的几何信息
repaint 根据render tree 以及 layout 得到的几何信息，得到节点的绝对像素
display 将像素发送给GPU，展示在页面上
```

[详细说明](https://www.cnblogs.com/chrislinlin/p/12629820.html)

### 跨域

1. 什么是同源策略

同源策略是浏览器的一种安全策略，限制加载非origin的脚本文件，减少可能被攻击的媒介

2. 同源定义

协议相同；端口相同；主机相同；

3. 跨域的解决方案

```js
1. CORS
可以使用 CORS 来允许跨源访问。CORS 是 HTTP 的一部分，它允许服务端来指定哪些主机可以从这个服务端加载资源。

2. JSONP & jquery jsonp
创建一个script标签，通过src动态向服务器传递参数和callback函数

const request = ({url, data}) => {
   return new Promise((resolve, reject) => {
        let { url, data, jsonpCallback = "callback" } = options;
        let handleDelData = (data) => {
            let keys = Object.keys(data);
            let len = keys.length;
            let pre = '';
            for (let i = 0; i < keys.length; i++) {
                let value = data[keys[i]];
                let flag = i !== len - 1 ? '&' : '';
                pre += `${keys[i]}=${value}${flag}`
            }
            return pre;
        }
        const script = document.createElement("script");
        script.src = `${url}?${handleDelData(data)}&callback=${jsonpCallback}`;
        document.body.appendChild(script);
        window[jsonpCallback] = (res) => {
            document.body.removeChild(script);
            delete window[jsonpCallback];
            resolve(res);
        }
    })
}

3. nginx 转发 proxy_pass
4. document.domain + iframe
5. window.name + iframe
6. postMessage + iframe
7. web sockets
```

### 前端性能优化

1. 减少请求资源大小或者次数

- 尽量和并和压缩css和js文件。（将css文件和并为一个。将js合并为一个）
- 尽量所使用的字体图标或者SVG图标来代替传统png图
- 采用图片的懒加载（延迟加载）
- 避免引入第三方大量的库
- 减少对cookie的使用
- 前端与后端协商，合理使用keep-alive
- 前端与服务器协商，使用响应资源的压缩
- 避免使用iframe

2. 代码优化相关

- 在js中尽量减少闭包的使用（使用闭包后，闭包所在的上下文不会被释放）
- 减少对DOM操作，主要是减少DOM的重绘与回流
- 减少css表达式的使用
- 尽量将一个动画元素单独设置为一个图层
- 使用window.requestAnimationFrame(js的帧动画)代替传统的定时器动画
- 基于script标签下载js文件时，可以使用defer或者async来异步加载

3. 存储

- 结合后端，利用浏览器的缓存技术，做一些缓存
- 利用h5的新特性（localStorage、sessionStorage）做一些简单数据的存储