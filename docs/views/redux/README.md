---
title: redux第一弹(基础篇)
date: 2021-02-18
tags:
 - redux
categories:
 - react
---

拓展：[大白话解析Redux](https://github.com/lulujianglab/blog/issues/34)

<!-- more -->

## Redux

-   store 由 Redux 的 createStore(reducer) 生成
-   state 通过 store.getState() 获取，本质上一般是一个存储着整个应用状态的对象
-   action 本质上是一个包含 type 属性的普通对象，由 Action Creator (函数) 产生
-   state 改变必须 dispatch 一个 action
-   reducer 本质上是根据 action.type 来更新 state 并返回 nextState 的函数
-   reducer 必须返回值，否则 nextState 即为 undefined

## API

-   createStore(reducer, [preloadedState], enhancer)
-   combineReducers(reducers)
-   applyMiddleware(...middlewares)
-   bindActionCreators(actionCreators, dispatch)
-   compose(...functions)

`createStore` 生成的 `store` 有四个 `API`，分别是：

-   getState()
-   dispatch(action)
-   subscribe(listener)
-   replaceReducer(nextReducer)

### createStore(reducer, [preloadedState])

创建一个 Redux store 来以存放应用中所有的 state， 应用中应有且仅有一个 store。理解创建一个数据库，数据库中包含所有的表

-   reducer 是更新 state 的处理函数，接收当前的 state 和要处理的 action，并返回一个新的 state
-   [preloadedState] 初始时的 state
-   enhancer (Function) Store enhancer 是一个组合 store creator 的高阶函数，返回一个新的强化过的 store creator

```jsx
import {createStore} from 'redux';

function reducer(state, action) {
    switch (action.type) {
        case 'xxx':
            return state;
        default:
            return state;
    }
}

const store = createStore(reducer);
```

### combineReducers(reducers:object)

合并 reducer 为一个最终的 reducer 函数

```jsx
import {createStore, combineReducers} from 'redux';

function reducer1(state, action) {
    switch (action.type) {
        case 'xxx':
            return state;
        default:
            return state;
    }
}

function reducer2(state, action) {
    switch (action.type) {
        case 'xxx':
            return state;
        default:
            return state;
    }
}

const reducer = combineReducers({reducer1, reducer2});

const store = createStore(reducer);
```

### applyMiddleware(...middlewares)

...middlewares 是所有的 middleware, 每个 middleware 接收 store 的 dispatch 和 getState 函数作为命名参数，并返回一个函数
。 ({ getState, dispatch }) => next => action。

```jsx
import { createStore, applyMiddleware } from 'redux'
import todos from './reducers'

function logger({getState, dispatch}) => next => action => {
        console.log('will dispatch', action)
        // 调用 middleware 链中下一个 middleware 的 dispatch。
        let returnValue = next(action)
        console.log('state after dispatch', getState())
        // 一般会是 action 本身，除非后面的 middleware 修改了它。
        return returnValue
    }
}
let store = createStore(todos,[], applyMiddleware(logger))
```

### compose(...functions)

从右到左来组合多个函数。

```jsx
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import DevTools from './containers/DevTools';
import reducer from '../reducers/index';
const store = createStore(reducer, compose(applyMiddleware(thunk), DevTools.instrument()));
```