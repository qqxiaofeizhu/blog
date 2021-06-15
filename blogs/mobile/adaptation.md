---
title: 移动端最佳适配方案探究
date: 2021-02-18
tags:
 - 适配方案
categories:
 - mobile
---

Q：真的有最佳适配方案吗？

A: 没有，只有哪个方案相对来说比较适合，大家其实都差不多，还是有很多边界的问题需要考虑的。

Q：市面上常见的适配方案都有哪些，我能随便拿一个就用吗？

A：rem，lib-flexible+postcss-pxtorem，postcss-px-to-viewport, 随便拿哪一个都可以，但是需要对不同机型进行考虑，对于平板，适配的情况不适特别友好。

<!-- more -->

## 移动像素的px、dp/pt、dpr的关系

- px: 逻辑像素，浏览器使用的抽象单位
- dp,pt:设备无关像素 也叫物理像素
- dpr:devicePixelRatio 设备像素缩放比

计算公式： 平面：1px=(dpr)^2*dp; 纬度：1px= dpr * dp;

举个栗子: iphone5的分辨率是640 * 1136，这里指的是物理像素但是在模拟器上显示出来的却是宽320像素，iphone5的320px*568px就是因为它的dpr等于2。此时一个css像素就会占据四个物理像素的位置，在x轴方向占两个，在y轴方向占两个，从纬度上来讲，X轴方向1px等于2dp像素点。

## 视口viewport

视口viewport分为布局视口，可视视口及理想视口，默认布局窗口（clientHeight）及可视窗口（window.innerWidth），我们移动端的适配方案是基于理想视口来的

关于视口的介绍，你可以看下这个链接：[传送门](https://juejin.cn/post/6892775873464926222)

## 移动端适配方案

市面上的移动端的适配方案非常的多，究其本质是使用了css的相对长度单位，使其在不同的设备下进行响应的缩放，适配方案大都是基于rem、vw这两个相对长度单位来实现的。

### 基于rem的适配方案

我想下面这两句代码，有不少老移动端童鞋都不会陌生：

```js
const deviceWidth = document.documentElement.clientWidth || document.body.clientWidth;
document.querySelector('html').style.fontSize = deviceWidth / 750(设计图的宽度) * 100 + 'px';
```

在那个移动端UI稿尺寸为750*1334满天飞的时代，这两句代码确实给开发者带来了很大的方便，这样设置根font-size后，设计图的px和rem的转换比例成了100/1, 即100px === 1rem, 为比如UI稿一个长宽分别为120px*40px，那么开发者对应的写成1.2rem*0.4rem就可以了, 这种换算已经是颇为方便，但是并非所有的项目都能这样去设置一个方便换算的比例系数，当比例系数为100时，小数点往前面挪两位就行了，然而有的项目设置的换算系数千奇百怪，有50的，有16的，很多已经严重超出口算力所能及的范畴了。所以后来诞生的<a href="https://www.npmjs.com/package/px2rem">px2rem</a>就是为了解决这个问题。

下面是我在多个项目中总结出的rem设置方案

```js
(function flexible(window, document) {
  setRemUnit();
  window.addEventListener('resize', () => {
    setRemUnit();
  });

  function setRemUnit() {
    var t = 100,
      o = 750,
      e = document.documentElement.clientWidth || window.innerWidth,
      n = Math.max(Math.min(e, 480), 320),
      h = 50;
    320 >= n && (h = Math.floor(n / o * t * .99)),
      n > 320 && 362 >= n && (h = Math.floor(n / o * t * 1)),
      n > 362 && 375 >= n && (h = Math.floor(n / o * t * 1)),
      n > 375 && (h = Math.floor(n / o * t * .97)),
      document.querySelector("html").style.fontSize = h + "px";
  }
}(window, document));
```

#### lib-flexible适配方案

`lib-flexible+postcss-pxtorem` 阿里推出的适配方案，用于设置`font-size`，同时处理一些窗口缩放的问题，具体可以参考[传送门](https://github.com/amfe/lib-flexible)

### 基于viewport适配方案

`postcss-px-to-viewport`是基于`viewport`的适配方案，它解决了以上提到的痛点，也满足以上提到的理想要求。它将`px`转换成视口单位`vw`，众所周知，`vw`本质上还是一种百分比单位，`100vw`即等于`100%`的屏幕宽度，即`window.innerWidth`

#### 如何使用

以webpack打包为例子，在项目中新建一个`postcss.config.js`文件

```js
module.exports = {
    plugins: {
        'postcss-px-to-viewport': {
            unitToConvert: 'px', // 要转化的单位
            viewportWidth: 750, // UI设计稿给的手机的窗口宽度
            unitPrecision: 6, // 转换后的精度，即小数点位数
            propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
            viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
            fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
            selectorBlackList: [], // 指定不转换为视窗单位的类名，
            minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
            mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
            replace: true, // 是否转换后直接更换属性值
            exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
            landscape: false // 是否处理横屏情况
        }
    }
};
```

## 移动端适配方案选择

由于`viewport`单位得到众多浏览器的兼容，使用自己实现的`rem`方案、`px2rem` 还是`lib-flexible`都有一定的问题，推荐使用`postcss-px-to-viewport`

## 参考链接`

1. [CSS的值与单位](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Values_and_units)