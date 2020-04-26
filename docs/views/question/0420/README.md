---
title: 问题 
date: 2020-04-20
tags:
 - question
categories:
 - question
---

## 1. BFC

```
块级格式化作用域上下文

作用：

① 使 BFC 内部浮动元素不会到处乱跑
② 和浮动元素产生边界
③ 防止容器坍塌
```

## 2. 从输入url的地址栏，到页面展示，这中间发生了什么

```javascript
① DNS 解析，获取到服务器的真实IP地址
② 建立TCP 链接
③ 进行HTTP 三次握手、HTTP四次挥手
④ 解析HTML、CSS 分别为DOM tree 和 css Rule Tree
⑤ 构建出 render tree
⑥ 根据 render tree 进行布局

layout 回流 根据render tree, 进行回流，得到元素节点的几何信息
repaint 根据render tree以及 layout 得到的几何信息，得到节点的绝对像素
display 将像素发送给GPU，展示在页面上

```
[详细说明](https://www.cnblogs.com/chrislinlin/p/12629820.html)

## 3. 跨域

1. 什么是同源策略

同源策略是浏览器的一种安全策略，限制加载非origin的脚本文件，减少可能被攻击的媒介

2. 同源定义

协议相同；端口相同；主机相同；

3. 跨域的解决方案

```js
1. CORS
可以使用 CORS 来允许跨源访问。CORS 是 HTTP 的一部分，它允许服务端来指定哪些主机可以从这个服务端加载资源。
2. JSONP
创建一个script标签，通过src动态向服务器传递参数和callback函数
3. nginx 转发 proxy_pass
```
4. JSONP 实现

```javascript
const request = ({url, data}) => {
    return new Promise((resolve, reject) => {
        // key=value&key=value
        const handleSortArgs = function(data) {
            let keys = Object.keys(data);
            let len = keys.length;
            return keys.reduce((pre, currentValue, index) => {
                let value = data[currentValue];
                let flag = index !== len - 1 ? '&' : '';
                return `${pre}${currentValue}=${value}${flag}`
            })
        }
        // 创建script
        const script = document.createElement("script");
        script.src = `${url}?${handleData(data)}&cb=callback`;
        document.body.appendChild(script);
        // callback处理
        window.callback = function(res) {
            document.body.removeChild(script);
            delete window.callback;
            resolve(res);
        }
    })
}
```

## 4. 前端性能优化问题

1. CDN外链加载资源
2. 避免使用CSS表达式
3. 减少DOM的访问
4. 减少301 302 DNS解析会消耗时间
5. nginx开启gzip模式
6. 代码层

## 5. js 的基本数据类型有哪些

```js
undefined null Boolean String Number Symbol
Array Object //引用数据类型
```

## 6. 如何判断一个变量是什么类型

```js
typeof 可以判断出 undefined Boolean String Number Symbol
Object.prototype.toString.call
let isType = type => obj => Object.prototype.toString.call(obj) === '[object ' + type + ']';
```
## 7. 数组常用的操作有哪些，都有什么含义怎么使用

```js
push                // 向数组的末尾添加一个元素，返回当前数组的长度
unshift             // 向数组的头部添加一个元素，返回当前数组的长度
pop                 // 从数组的队尾删除一个元素，并返回该元素
shift               // 从数组的头部删除一个元素，并返回该元素
slice               // 从数组中截取起始位置到结束位置之间的元素，并返回一个新的数组，不改变原数组
splice              // 从数组中截取起始位置到结束位置之间的元素，返回一个新数组，改变原数组，也可以添加数据
sort                // 按照条件进行数组排序，返回改变后的数组
reduce              // 进行数据每一项的叠加(pre // 返回值, currentItem, index, arr), initData // 初始值
forEach             // 遍历数组中的每一项
map                 // 遍历数组的每一项，对数组中的每一项进行条件处理，并返回一个新的数组
filter              // 遍历数组的每一项，对数组的每一项按照条件筛选，返回符合条件的新数组
includes            // 判断数组中是否含有某个值，返回true / false
indexOf             // 判断数组中是否含有某个值，并返回其所在数组的下标值
concat              // 连接两个或者多个数组
find                // 选择符合条件的元素，若有多个元素，则返回第一个匹配的元素
findIndex           // 选择符合元素的下标，则返回第一个匹配元素的下标
entries()           // 将数组转化为键值对的形式 键是index, value是元素
keys()              // 遍历元素的下标
values()            // 遍历元素的值
flat()              // 嵌套数组降维
...                 //扩展运算符
Array.of            // 将参数中的值转化为数组
Array.from          // 将类数组（必须以下标为key，并且有length属性）或者可迭代的对象转化为数组
Array.isArray       // 是否是数组
```
## 8. 数据的拷贝有哪些方式

```js
1. slice        // 只能拷贝不含引用数据类型，浅拷贝
2. JSON.parse(JSON.stringify()) // 完全拷贝
3. 深拷贝
```

## 9. 对象的拷贝有哪些方式

```js
1. Object.assign            // 浅拷贝，拷贝的引用地址
2. JSON.parse(JSON.stringify()) // 深拷贝
3. 深拷贝
```

## 10. 深拷贝实现

```js
function DeepCopy(obj) {
    if (obj == null || typeof obj !== 'object') {
        return obj
    };
    const copy = Array.isArray(obj) ? [] : {};
    Object.keys(obj).forEach(key => {
        copy[key] = DeepCopy(obj[key]);
    })
    return copy;
}
```
## 11.setTimeout Promise async await的区别

```js
setTimeout 是定时器，在事件循环机制中属于宏任务，在指定时间后执行callback函数
Promise 是同步的立即执行函数，只有在执行resolve和reject才是异步任务，属于事件循环机制中的微任务，Promise 拥有三个状态（pedding, resolve, reject），且状态一旦发生改变就会固定下来
async await 是generator 的语法糖， async 返回的是一个promise函数，遇到await 就会先返回await的结果，再继续向下执行，将主线程让出
```

## 12. event Loop

事件循环机制，是浏览器解决单线程阻塞的一种处理机制，在程序中，主线程不断循环从任务队列中读取事件，称为事件循环

## 13. call, apply, bind

```javascript
Function.prototype.call = function (context) {
    // 参数是...arguments
    context = context || window;
    context.fn = this;
    let result = null;
    let args = [...arguments].slice(1);
    result = context.fn(...args);
    delete context.fn;
    return result;
}

Function.prototype.apply = function (context) {
    // 参数是...arguments
    context = context || window;
    context.fn = this;
    let result = null;
    let args = arguments[1];
    result = context.fn(...args);
    delete context.fn;
    return result;
}

Function.prototype.bind = function (context) {
    // 参数是...arguments
    let self = this;
    let args = [...arguments].slice(1);

    return function () {
        return self.apply(context, args.concat([...arguments]))
    }
}
```

## 14. 函数柯里化

```js
偏函数 & 函数柯里化 区别：
偏函数(局部应用)是固定一个函数的一个或者多个参数，也就是将一个 n 元函数转换成一个 n - x 元函数。

柯里化是将一个多参数函数转换成多个单参数函数，也就是将一个 n 元函数转换成 n 个一元函数。

什么是元？元是指函数参数的个数，比如一个带有两个参数的函数被称为二元函数。

偏函数(局部应用) 和 函数柯里化 尽管很像，但是却是js中两种处理函数的技术。

经典面试题

实现一个add方法，使计算结果能够满足如下预期：
  add(1)(2)(3) = 6
  add(1, 2, 3)(4) = 10
  add(1)(2)(3)(4)(5) = 15
  add(2, 6)(1) = 9  
提示：函数柯里化、偏函数、call、arguments、隐式转换

function add() {
    // 第一次执行时，定义一个数组专门用来存储所有的参数
    var _args = Array.prototype.slice.call(arguments);

    // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
    var _adder = function() {
      _args.push(...arguments);
      return _adder;
    };

    // 利用toString隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
    _adder.toString = function () {
      return _args.reduce(function (a, b) {
          return a + b;
      });
    }
    return _adder;
}
```

```js 
function curry(fn, args) {
    let length = fn.length
    args = args || [];

    return function () {
        // 获取参数列表。
        var _args = args.slice(0);
        Array.prototype.push.apply(_args, Array.prototype.slice.call(arguments))
        if (_args.length < length) {
            // 如果传入的参数列表长度还没有超过函数定义时的参数长度，就 push 新的参数到参数列表中保存起来。
            // 自己调用自己，将保存的参数传递到下一个柯里化函数。
            return curry.call(this, fn, _args);
        }
        else {
            // 如果传入的参数列表长度已经超过函数定义时的参数长度，就执行。
            return fn.apply(this, _args);
        }
    }
}
```

## 15. 高阶函数

满足这两个任一一个条件： 接收一个或多个函数作为输入；输出一个函数

## 16. 实现一个简单的promise，是一个高阶函数

```js
Promise.prototype.then(function resolved() { }, function rejected() { });
Promise.prototype.catch(function rejected() { })
Promise.prototype.finally       // 用于指定不管 Promise 对象最后状态如何，都会执行的操作
Promise.all                     // 用于将多个 Promise 实例，包装成一个新的 Promise 实例, 以数组的形式返回所有的结果
Promise.race                    // 用于将多个 Promise 实例，包装成一个新的 Promise 实例, 返回第一个成功的Promise实例
Promise.resolve                 // 将现有对象转为Promise对象 是promise对象会原封不动的返回，不是具有then方法的对象或者不是对象，返回resolved状态，thenable会做处理返回
Promise.reject                  // 将现有对象转为Promise对象，状态为rejeted， 参数原封不动抛出
// 缺点： 一旦创建就会立即执行，无法取消； promise内部的错误，不设置回调函数，无法体现到外部；当处于pending状态，无法得知目前的进展
// 优点：将异步操作以同步的状态流程表达出来
// 总结就是 Promise或者thenable 会按照正常的promise运行，catch可以获取rejected的值，对于不是Promise或者thenable的对象，会原封不动的返回resolve或reject
```
## 17. 写一个函数Fn，接收一个参数，返回一个数组，包含n个不重复的随机整数，每个数都要求大于2小于31

```js
function Fn(n, min, max) {
    let arr = [];
    let isNum = !isNaN(Number(n));//判断n是不是一个数字，包含字符串类型的数字
    let isRandOk = (n > min && n < max && n < (max - min)) ? true : false;
    if (isRandOk && isNum) {
        for (let i = 0; i < n; i++) {
            let rand = getRand(min, max);
            if (isRepeat(rand, arr)) {
                i--;
            } else {
                arr.push(rand);
            }
        }
    }
    return arr;
}
function getRand(a, b) {
    return Math.ceil(Math.random() * (b - a) + a);
}
function isRepeat(rand, arr) {
    if (arr.indexOf(rand) !== -1) {
        return true;
    }
    return false;
}
```
## 18. 原型链

```js
构造函数 function Xx() { };
原型 Xx.prototype
实例  new Xx;
JS 构造 函数都包含一个原型对象，原型对象都包含一个指向构造函数的constructor, 实例都包含指向原型对象的指针__proto__
new Xx.__proto__ == Xx.prototype  Xx.prototype.constructor == Xx;
```
## 19. 为什么遇到script标签，会阻塞渲染

js是单线程，多线程模式，常见的线程包含GUI线程，JS引擎线程，事件触发线程，定时触发器线程，HTTP线程，其中JS引擎线程和GUI引擎线程互斥，当解析JS时，GUI会被挂起

## 20. 节流和防抖

```js
// 在一定的时间只执行一次
const throttle = function (fn, wait = 50) {
    let previous = 0;
    return function () {
        let now = new Date().getTime();
        if (now - previous > wait) {
            previous = now;
            fn.apply(this, arguments)
        }
    }
}
// 防抖 函数在某段时间内，无论触发多少次，都执行最后一次
function debounce(fn, wait, immediate) {
    let timer = null;
    return function () {
        if (timer) clearTimeout(timer)
        
        if (immediate && !timer) {
            fn.apply(this, arguments)
        }

        timer = setTimeout(() => {
            fn.apply(this, arguments)
        }, wait);
    }
}
```

## 21. ['1', '2', '3'].map(parseInt)

```js
map 中接收的是一个函数(currentItem, index, arr); parseInt(value, radix) 

radix 代表的是基数，其范围是2~36，默认是10

['1', '2', '3'].map(parseInt) 等价于

['1', '2', '3'].map((currentItem, index, arr) => {
    return parseInt(currentItem, index, arr)
}, thisArgs)

parseInt('1', 0);
parseInt('2', 1);
parseInt('3', 2)
```

## 22. 有以下 3 个判断数组的方法，请分别介绍它们之间的区别和优劣

```js
1. Object.prototype.toString.call
2. Array.isArray    // es6 提供
3. instanceof       // 判断该原型链上能不能找到该对象的原型对象 prototype

const obj = {}
obj.__proto__ = Array.prototype
// Object.setPrototypeOf(obj, Array.prototype)
obj instanceof Array // true

总结：Array.isArray 存在兼容性的问题，instanceof 很容易改变原型对象的指向
```

## 23. var 和 不用 var 声明的区别

使用var声明的变量的作用域是它当前的执行上下文，可以是局部变量也可以式全局变量

给未声明的变量赋值，该变量被隐式的创建为全局对象下的属性，可以用delete删掉

## 24. 下面的代码打印什么内容，为什么？

```js
var b = 10;
(function b(){
    b = 20;
    console.log(b); 
})();

解析： 函数的创建方式
1. 函数声明式 function xx();
2. 函数表达式 var xx = function();
3. 实例化 var xx = new Fuction();

函数表达式存在作用域提升的问题，对于IFFE(立即执行函数来讲) 函数声明被解析为函数表达式

var a = 10;
(function b(){
    console.log(a)          
    var a = 5;
    console.log(window.a);
    a = 20
    console.log(a); 
})();

var a = undefined;
console.log(a);     // undefined
a = 5;
console.log(window.a); // 10
a = 20;
console.log(a);   // 20
```
## 25. 输出以下代码执行的结果并解释为什么

```js
var obj = {
    '2': 3,
    '3': 4,
    'length': 2,
    'splice': Array.prototype.splice,
    'push': Array.prototype.push
}
obj.push(1)
obj.push(2)
console.log(obj)

[empty, empty, 1, 2]
```

## 26. cookie 和 token 都存放在 header 中，为什么不会劫持 token？

每次请求服务器都会自动带上cookie, 不会自动带上token，需要手动在header中设置token

## 27. 写 React / Vue 项目时为什么要在列表组件中写 key，其作用是什么？

key的作用就是更新组件时判断两个节点是否相同。相同就复用，不相同就删除旧的创建新的。

## 28. 介绍下深度优先遍历和广度优先遍历，如何实现？

解析：深度优先遍历是自上而下的遍历，广度优先遍历是逐层进行遍历的

1. 深度优先

![image](./images/168835b8a2cb3013.png);

2. 广度优先

![image](./images/168835b8a1d24a3b.png);

两者的区别：

1. 深度优先不需要记住所有的节点, 所以占用空间小, 而广度优先需要先记录所有的节点占用空间大

2. 深度优先有回溯的操作(没有路走了需要回头)所以相对而言时间会长一点

深度优先采用的是堆栈的形式, 即先进后出

广度优先则采用的是队列的形式, 即先进先出

## 29. 快速排序

快速排序也叫二分法，是比较基础的排序算法，思想是找出数组中的中间元素，将该元素从数组中取出，遍历数组，将比基准点小的值放在左侧，大的放在右侧

```javascript
function quickSort(arr) {
    if (arr.length < 2) {
        return arr;
    }

    let pointValue = arr.splice(Math.floor(arr.length / 2), 1)[0];
    let leftArr = [];
    let rightArr = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < pointValue) {
            leftArr.push(arr[i])
        } else {
            rightArr.push(arr[i])
        }
    }

    return quickSort(leftArr).concat([pointValue], quickSort(rightArr))
}
```

## 30. 冒泡排序

冒泡排序的思想是相邻的进行对比，然后置换其对象的位置

```javascript
function bubbleSort(arr) {
    let flag;
    if (arr.length < 2) {
        return arr;
    }
    for (let i = 0; i < arr.length; i++) {
        flag = true;
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                flag = false;
            }
        }
        if (flag) {
            break;
        }
    }
    return arr;
}
```
## 31. 左右布局，左右+上下布局，盒子模型，css定位属性，flex布局

```js
css单位 (eg: px, vw, vh)
position 定位: static(默认值)、absolute、relative、fixed、inherit(从父元素继承position的值)
```

## 32. css实现一个对话框样式

## 33. 如何改变placeholder样式

## 34. 元素如何垂直水平居中

## 35. 获取选中radio的值

## 36. 编写js函数，用于测试输入的字符穿是否如下格式 xxx-xxx-xxxx-0(x为0-9的数字)

正则的扩展

```js
/\d{3}-\d{3}-\d{4}-0/;
```

## 37. forEach实现

## 38. proxy 和 defineProperty

## 39. koa洋葱模型

## 40. express koa 中间件（middleware）

## 41. post 和 get 的区别

```js
GET的请求参数直接在页面上显示，post请求参数在http body体中
GET请求有长度的限制，POST请求没有限制
GET请求可以被浏览器缓存，POST请求不行
GET只允许ASCII字符，POST请求不会
```

## 42. 前端加密

常用加密有MD5,AES,RSA

```js
AES 是对称加密，使用相同的密钥去解密
RSA 是非对称加密，公钥加密，私钥解密

前端生成AES密钥，获取后端RSA公钥
RSA公钥加密数据和AES密钥，传递到后台，后台RSA解密解密出AES密钥，再用AES密钥解析传递的数据
后台用AES加密数据，前端使用保存的AES进行解密
```

## 43. 小程序setData优化问题

## 44. 小程序框架对比

```javascript
taro mpvue uni-app wepy kbone

因为不会react，只能选择mpvue 及 uni-app mpvue更新太慢，基本无人维护 uni-app社区比较好，功能比较全，还可以多端适配
```

## 45. http状态码

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

## 46. new 操作符都做了什么，如何实现
```js
new 运算符：创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例

new 运算符会进行如下操作：

创建一个空的简单JavaScript对象（即{}）
链接该对象（即设置该对象的构造函数）到另一个对象
将步骤1新创建的对象作为this的上下文
如果该函数没有返回对象(或 返回基本数据类型)，则返回this
```

## 47. 结构赋值的常用法

```js
1. 数组解构
2. 对象解构
3. 函数参数解构
4. 加载函数模块，函数方法解构 
5. 数值和布尔的结构 
```

## 48. class 继承的几种方式

## 49. vue react diff算法

## 50. react的生命周期

**

## 51. pwa

** 支持不多

## 52. 缓存

**

## 53. 推送

**

## 54. 通知

**

## 55. 移动端你遇到的兼容性问题

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

## 56. require & import

node 编程中最重要的是模块化思想，require 和 import 都是用于模块化的。

require：运行时调用，所以随处可以使用。是commonJs的
import：编译时调用，所以只能在开头引入。目前一些浏览器不支持es6，需要使用babel将其转换成es5使用(eg: 把 import 转换成 require)。是es6的

## 57. http 和 https 的区别

```js
https协议需要到ca申请证书，所以需要一定的费用
http是超文本传输协议，信息是明文传输。https是具有安全性的ssl加密传输协议
http的连接是无状态的
https协议是ssl+http协议构建的可进行加密传输、身份认证的网络协议，比http协议安全
http协议默认的端口是80，https协议默认的端口是443
```

## 58. js继承

```js

许多OOP语言(面向对象语言)，都有支持两种继承方式：接口继承 & 实现继承。
接口继承 继承的是 方法签名，实现继承 继承的是实际的方法。
由于js中方法没有签名，所以在es中无法实现接口继承，es只支持实现继承，而且其实现继承主要是依靠原型链 来实现的。

js中继承大体有以下6种：

构造函数类继承
原型链继承
组合继承
原型式继承
寄生式继承
寄生组合式继承
```
## 59. wondow.onload & document.ready

wondow.onload: 在页面资源（比如图片和媒体资源，它们的加载速度远慢于DOM的加载速度）加载完成之后才执行

document.ready: 在DOM树加载完成后执行

也就是说$(document).ready要比window.onload先执行。$(function(){}) 和 $(document).ready(function(){}) 是一个方法，$(function(){})为简写


## 60. 如何获取radio的值

```js
$('input:radio:checked').val()；
$("input[type='radio']:checked").val();
$("input[name='id']:checked").val();
```

## 61. jquery 

```js

JQUERY Dom

jQuery.append(content)，这个方法用于追加内容，比如$(“div”).append(“<span>hello</span>”);
jQuery.appendTo(selector)，这个方法和上一个方法相反，比如$(“<span>hello</span>”).appendTo(“#div”)，这个方法其实还有一个隐藏的move作用，即原来的元素被移动了
jQuery.prepend(content)，跟append()方法相对应，在前面插入
jQuery.prependTo(selector)，跟上一个方法相反
jQuery.after(content)，在外部插入，插入到后面，比如$(“#foo”).after(“<span>hello</span>”);
jQuery.insertAfter(selector)，和上一个方法相反，比如$(“<span>hello</span>”).insertAfter(“#foo”);
jQuery.before(content)，在外部插入，插入到前面
jQuery.insertBefore(selector)，跟上一个方法相反
jQuery.wrapInner(html)，在内部插入标签，比如$(“p”).wrapInner(“<span></span>”);
jQuery.wrap(html)，在外部插入标签，比如$(“p”).wrap(“<div></div>”)，这样的话，所有的<p>都会被各自的<div>包裹
jQuery.wrapAll(html)，类似上一个，区别在于，所有的<p>会被同一个<div>包裹
jQuery.replaceWith(content)，比如$(this).replaceWith(“<div>”+$(this).text()+”</div>”);
jQuery.replaceAll(selector)，比如$(“<div>hello</div>”).replaceAll(“p”);
jQuery.empty()，比如$(“p”).empty()，这样的话，会把<p>下面的所有子节点清空
jQuery.remove(expr)，比如$(“p”).remove()，这样的话，会把所有<p>移除，可以用表达式做参数，进行过滤
jQuery.clone()，复制一个页面元素

JQUERY CSS

jQuery.css(name)，获取一个css属性的值，比如$(“p”).css(“color”)
jQuery.css(object)，设置css属性的值，比如$(“p”).css({“color”:”red”,”border”:”1px red solid”});
jQuery.css(name,value)，设置css属性的值，比如$(“p”).css(“color”,”red”);
jQuery.toggleClass(class)，反复切换class属性，该方法第一次执行，增加class，然后去除该class，循环
jQuery.toggleClass(class,switch)，增加一个switch表达式
jQuery.hasClass(class)，返回boolean
jQuery.removeClass(class)，删除class
jQuery.addClass(class)，增加class


JQUERY 属性

jQuery.removeAttr(name)
jQuery.attr(name)，返回属性的值，比如$(“img”).attr(“src”)
jQuery.attr(key,value)，这是设置属性的值
jQuery.attr(properties)，也是设置属性的值

JQUERY位置计算相关方法

jQuery.scrollLeft()，设置滚动条偏移，这个方法对可见元素或不可见元素都生效
jQuery.scrollTop()，设置滚动条偏移，这个方法对可见元素或不可见元素都生效
jQuery.offset()，计算偏移量，返回值有2个属性，分别是top和left
jQuery.position()，计算位置，返回值也有2个属性，top和left
```

## 62. 说说浏览器和 Node 事件循环的区别

Node 10以前：

执行完一个阶段的所有任务
执行完nextTick队列里面的内容
然后执行完微任务队列的内容
Node 11以后： 和浏览器的行为统一了，都是每执行一个宏任务就执行完微任务队列。

## 个人介绍

面试官您好，我叫xxx，今年24岁，网络工程专业，有三年的前端开发经验，目前主要的技术栈是vue,

16年开始接触前端并对他产生浓厚的兴趣, 17年开始参加工作，就职于北京网梯科技研发公司点读笔项目部

目前产品主要服务于外研社等各大出版社，核心产品是智能点读笔以及外研通APP，旨在帮助家长解决孩子英语学习发音等问题

我这边主要负责的项目是外研通售后服务平台以及各种H5活动，App内嵌H5，运营数据平台。

我有自己的个人职业规划和良好的学习能力，沟通能力以及解决问题的能力，能够独立完成项目的开发及部署调研陌生的技术并应用到项目中。

我的好朋友目前在贵公司工作，经常听他提起贵公司的事情，对贵公司非常向往，现在能有这个机会能参加贵公司的面试，我非常高兴，希望可以

加入到贵公司，为贵公司的发展做出一份自己的贡献


个人职业规划

1. 17~19年底学习前端主要技术栈，提升自己的业务水平，独立负责项目开发及部署

2. 20~21年底沉淀自己，巩固自己的基础知识，知道use and why

3. 22~23年学习些后台方面的知识，准备向全栈工程师迈进