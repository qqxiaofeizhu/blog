---
title: 网络协议篇
---

### http常见状态码的含义

```js
200 ok
301 永久重定向
302 暂时重定向
304 资源已缓存
400 bad request 
401 没有权限
403 token失效
404 not found
405 method not allow
408 超时
500 服务器错误
502 网关错误，服务未启动
```

### post 和 get 的区别

```js
GET的请求参数直接在页面上显示，post请求参数在http body体中
GET请求有长度的限制，POST请求没有限制
GET请求可以被浏览器缓存，POST请求不行
GET只允许ASCII字符，POST请求不会
GET回退浏览器无害，POST会再次提交请求(get请求会被缓存，可以直接从缓存中获取资源)
```

### http 和 https 的区别

```js
https协议需要到ca申请证书，所以需要一定的费用
http是超文本传输协议，信息是明文传输。https是具有安全性的ssl加密传输协议
http的连接是无状态的
https协议是ssl+http协议构建的可进行加密传输、身份认证的网络协议，比http协议安全
http协议默认的端口是80，https协议默认的端口是443
```

### 前端加密

常用加密有MD5,AES,RSA

AES 是对称加密，使用相同的密钥去解密

RSA 是非对称加密，公钥加密，私钥解密

前端生成AES密钥，获取后端RSA公钥，RSA公钥加密数据和AES密钥，传递到后台，后台RSA解密解密出AES密钥，再用AES密钥解析传递的数据，后台用AES加密数据，前端使用保存的AES进行解密
