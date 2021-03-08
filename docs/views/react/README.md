---
title: react第一弹(基础篇)
date: 2021-02-18
tags:
 - react
categories:
 - react
---

用于构建用户界面的 JavaScript 库

<!-- more -->

## JSX 需要注意的地方

JSX 使用 camelCase（小驼峰命名）来定义属性的名称，而不使用 HTML 属性名称的命名约定。

## 如何声明一个 React 组件

在 React 中有两种组件的声明方式，一种是 function, 一种是类的声明方式，在使用声明的组件时，React 会将以小写字母开头的组件
视为原生 DOM 标签，所以组件要使用大写的形式, JSX 表达式必须具有一个父元素

### 函数声明形式

```jsx
function ComponentA(props) {
    return `your ui view`;
}
```

### 类声明形式

-   React.Component
-   React.PureComponent
-   React.memo

React.Component 是使用 ES6 class 类来定义的 React 基类，PureComponent 和 Component 的唯一区别就是 Component 未实现
shouldComponentUpdate

React.PureComponent 中以浅层对比 prop 和 state 的方式来实现了该函数， 如果数据比较复杂，则有可能因为无法检查深层的差别，
产生错误的比对结果

React.memo （记忆组件）为高阶组件。如果你的组件在相同 props 的情况下渲染相同的结果，那么你可以通过将其包装在 React.memo
中调用，以此通过记忆组件渲染结果的方式来提高组件的性能表现，React.memo 仅检查 props 变更。如果函数组件被 React.memo 包裹
，且其实现中拥有 useState 或 useContext 的 Hook，当 context 发生变化时，它仍会重新渲染。

```jsx
class componentName extends React.component {
	render() {return `your ui view`}
	// to finish other props or methods...
}
class componentName extends React.PureComponent {
	render() {return `your ui view`}
	shouldComponentUpdate() => {}
}
const MyComponent = React.memo(function MyComponent(props) {
  /* 使用 props 渲染 */
});
```

## props

当 React 元素为用户自定义组件时，它会将 JSX 所接收的属性（attributes）以及子组件（children）转换为单个对象传递给组件，这
个对象被称之为 “props”，props 不能被该改变，为只读对象

```jsx
const Element = <ComponentA name="wjs" />;

function ComponentA(props) {
    console.log(props.name); // wjs
    return JSX;
}
```

```jsx
class ComponentA extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.name); // wjs
    }
    render() {
        return JSX;
    }
}
```

## props.children

每个组件都可以获取到 props.children。它指的是包含组件的开始标签和结束标签之间的内容

```jsx
<组件名>我是props.children内容</组件名>;

function 组件名(props) {
    return <p>{props.children}</p>;
}

class 组件名 extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.children);
    }
}
```

## key

元素身份标识，需要是唯一可确定的元素，方便 diff 前后变化

## 父子通信

1. 通过 props 形式传递

```jsx
// 子组件
class Children extends from React.Component {
    constructor(props) {
        super(props);
    }

    change = () => {
        this.props.update("name", 'lyf');
    }

    render(){
        return(
            <div>
                <div>{this.props.name}</div>
                <div>{this.props.age}</div>
                <button onClick={this.change}>点击</button>
            </div>
        )
    }
}
// 父组件
class Parent extends from React.Component {
    constructor(props) {
        super(props);
        this.state = {name: 'wjs', age: 24};
    }

    update = (key, value) => {
        this.setState({
            key: value
        })
    }

    render() {
        return(
            <div>
                <Children callback={this.update} name={this.state.name} age={this.state.age}></Children>
            </div>
        )
    }
}
```

## state

state 是组件的状态机, 记录组件的属性状态，通过 setState 来更改属性的值

```js
class ComponentA extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'wjs'
        }
        {/* 处理方式1 */}
        this.changeName = this.changeName.bind(this);
    }

    changeName() {
        this.setState({
            name: 'lyf';
        })
    }

    render() {
        return (
            <div>
                <p>{this.state.name}</p>
                {/* 处理方式1，改变this的指向 */}
                <button type="button" onClick={this.changeName}>改变姓名</button>
                {/* 处理方式2，改变this的指向 */}
                <button type="button" onClick={this.changeName.bind(this)}>改变姓名</button>
                {/* 处理方式3, 使用箭头函数 */}
                <button type="button" onClick={() => this.changeName()}>改变姓名</button>
            </div>
        )
    }
}
```

## React 的生命周期以及生命周期所做的事情

React 的生命周期比较简单，分为三类，挂载，更新以及卸载

-   Mounting：已插入真实 DOM
-   Updating：正在被重新渲染
-   Unmounting：已移出真实 DOM

```jsx
componentWillUnmount; // 在渲染前调用,在客户端也在服务端
componentDidMount; // 在第一次渲染后调用，只在客户端。之后组件已经生成了对应的DOM结构，可以通过ReactDom.findDOMNode()来进行访问

componentWillReceiveProps; // 在组件接收到一个新的 prop (更新后)时被调用。这个方法在初始化render时不会被调用
shouldComponentUpdate;

componentWillUpdate;
componentDidUpdate;

componentWillUnmount; // 组件移除DOM之前立即调用
```

## React 事件处理

1. React 事件绑定属性的命名采用驼峰式写法，而不是小写。
2. 如果采用 JSX 的语法你需要传入一个函数作为事件处理函数，而不是一个字符串(DOM 元素的写法)

在 JSX 上使用事件时要注意 this 的指向问题

## 代码分割

在你的应用中引入代码分割的最佳方式是通过动态 import() 语法。

1. 引入库文件方法

```jsx
// 使用前
import {add} from 'math';
console.log(add(16, 26));
// 使用后
import('math').then(math => {
    console.log(math.add(16, 26));
});
```

2. 使用 React.lazy 动态引入组件

```jsx
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));

我们需要在 Suspense 组件中渲染 lazy 组件，可以在等待加载 lazy 组件时做优雅降级，加入loading

function MyComponent() {
    return (
        <div>
            <Suspense>
                <OtherComponent fallback={<div>Loading...</div>}></OtherComponent>
            </Suspense>
        </div>
    )
}

如果模块加载失败（如网络问题），它会触发一个错误，会触发异常，可以使用Error boundaries处理错误
```

## Fragments 片段

可以在一个组件中返回多个元素，不需要向组件中添加额外的节点

```jsx
render() {
    <React.Fragment>
        <ComponentA/>
        <ComponentB/>
        <ComponentC/>
    </React.Fragment>
}
// React.Fragment 可以缩写为<></>
```

## 高阶组件

高阶组件是参数为组件，返回值为新组件的函数，组件是将 props 转换为 UI，而高阶组件是将组件转换为另一个组件