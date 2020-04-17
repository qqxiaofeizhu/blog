---
title: Vue
date: 2020-04-15
tags:
 - vue
categories:
 - frame
---

## vue 框架

vue 是一个构造函数，是一个类，它是单例模式

## mvvm && mvc && mvp

`mvc`: `Model-View-Controller`简称`mvc`

![image](./images/15226743-7b9ec190c760b7a8.png)

`mvvm`:`Model-View-ViewModel`简称`mvvm`

![image](./images/15226743-1b2adc4a66e12c6e.png)

`mvp`: `Model-View-Presenter`简称`mvp`

![image](./images/15226743-cc8ce0ab83777e7a.png)

## 生命周期

```api
beforeCreate            初始化实例完成，但是对应的数据观察，事件，watch,computed等还没有开始配置            
created                 实例创建完成后调用，配置完成，没有获取到挂载的节点，此时虚拟dom还没有开始创建，但是可以使用内部的属性和方法
beforeMount             挂载前被调用，获取到要挂载的节点，开始渲染虚拟dom
mounted                 实例被挂载后调用，此时虚拟dom已经替换实体dom，el被$el替换
beforeUpdate            数据更新时调用，此时还可以访问旧的dom
updated                 DOM更新后调用，此时dom已更新完毕
beforeDestroy           实例销毁之前调用，还可以继续访问该实例
destroyed               实例销毁后调用，挂载在实例上的方法和属性都被销毁

// keep-alive 模式下
activated               组件被激活调用
deactivated             组件停用时调用
```

## v-if & v-show && v-for

v-if 是条件渲染，只有符合条件，才会在dom树上显示dom

v-show 是css display状态切换，元素始终会在dom上显示

v-for 与 v-if 一起使用时，v-for的优先级更高，避免在同层使用

## computed & watch & methods

1. computed 计算属性，具有缓存更新依赖
2. watch    监听属性，监控一个属性的变化后所要处理的操作
3. methods  方法，不具备缓存，每次都会重新运行

## 组件之间通信

```api
props               父子组件通信,父组件向子组件传递数据
emit, on            子组件派发事件，父组件监听子组件事件触发后传递的参数
$refs               获取组件实例
$root               获取根组件实例
$parent             获取父组件实例
$children           获取子组件的实例
provide & inject    依赖注入
vuex                官方提供的组件间数据管理状态机
event bus           new Vue();
```

## 模板

template            字符串模板
render              字符串模板的代替方案，允许你发挥 JavaScript 最大的编程能力
Vue.compile         将一个模板字符串编译成 render 函数

## 侦听器

1. 通过 $on(eventName, eventHandler) 侦听一个事件
2. 通过 $once(eventName, eventHandler) 一次性侦听一个事件
3. 通过 $off(eventName, eventHandler) 停止侦听一个事件

## 强制更新

$forceUpdate

## 状态过渡

可以实现转场动画和赋予组件及动画生命

## keep-alive

缓存组件的状态避免重新渲染

```api

组件的name值或者组件局部注册名称

include         字符串或正则表达式。只有名称匹配的组件会被缓存。 
exclude         字符串或正则表达式。任何名称匹配的组件都不会被缓存。
max             数字。最多可以缓存多少组件实例。

// 生命钩子
activated
deactivated
```

## vnode

## vue 如何实现双向数据绑定

## 如何优化vue项目的加载速度