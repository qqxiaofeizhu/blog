---
title: vuex 方法化配置
date: 2020-04-17
sidebar: false
tags:
 - vuex
categories:
 - frame
---

做数据平台时对`vuex`进行简单的封装，不过现在暂时没有事件去做优化，先放一下

1. `actions` 配置

```js
import platform from './modules/state';

const ACTIONS_MAP = {};

function formatting(str) {
    return str.replace(/[A-Z]+/g, ($String) => `_${$String}`).toUpperCase();
}

function LoadingResources() {
    for (let key in platform.state) {
        let KeyType = `COMMIT_${formatting(key)}`;
        ACTIONS_MAP[`SET_${formatting(key)}`] = ({
            commit
        }, value) => {
            return commit(KeyType, value)
        }
    }
}

LoadingResources();

const actions = Object.assign({}, ACTIONS_MAP)

export default actions;
```

2. `getters` 配置

```js
import platform from './modules/state';

const GETTERS_MAP = {};

const modelName = 'platform';

function formatting(str) {
    return str.replace(/[A-Z]+/g, ($String) => `_${$String}`).toUpperCase();
}

function LoadingResources() {
    for (let key in platform.state) {
        GETTERS_MAP[`GET_${formatting(key)}`] = state => {
            let value = state[`${modelName}`][`${key}`];
            let gettersData = '';
            // check type, 防止数据流倒推
            if (Array.isArray(value)) {
                gettersData = value.slice(0);
                return gettersData;
            }
            if (value && typeof value === 'object') {
                gettersData = JSON.parse(JSON.stringify(value));
                return gettersData;
            }
            gettersData = value;
            return gettersData;
        }
    }
}

LoadingResources();

const getters = Object.assign({}, GETTERS_MAP)

export default getters
```

3. `mutations` 配置

```js
import platform from './modules/state';

const MUTATIONS_MAP = {};

const modelName = 'platform';

function formatting(str) {
    return str.replace(/[A-Z]+/g, ($String) => `_${$String}`).toUpperCase();
}

// 深度合并对象
function deepObjectMerge(target, merge) {
    for (let key in merge) {
        target[key] = target[key] && target[key].toString() === "[object Object]" ?
            deepObjectMerge(target[key], merge[key]) : target[key] = merge[key];
    }
    return target;
}

function LoadingResources() {
    for (let key in platform.state) {
        MUTATIONS_MAP[`COMMIT_${formatting(key)}`] = (state, newValue) => {
            // 当前值是数据的话，直接覆盖
            if (Array.isArray(newValue)) {
                state[`${modelName}`][`${key}`] = newValue.slice(0);
                return;
            }
            // 当前值是对象的话，merge
            if (newValue && typeof newValue === 'object') {
                state[`${modelName}`][`${key}`] = JSON.parse(JSON.stringify(deepObjectMerge(state[`${modelName}`][`${key}`], newValue)));
                return;
            }
            state[`${modelName}`][`${key}`] = newValue;
            console.log(state[`${modelName}`][`${key}`], newValue, '操作数据更改');
            return;
        }
    }
}

LoadingResources();

const mutations = Object.assign({}, MUTATIONS_MAP)

export default mutations
```

4. `state`配置

```js
const platform = {
    state: {
        // 初始化面包屑
        bread: [],
        // 初始化全局筛选组件
        filtersOptions: {
            startTime: new Date().setHours(0, 0, 0, 0) - 7 * 8.64e7,
            endTime: new Date().setHours(23, 59, 59, 59) - 8.64e7,
            endDate: new Date().setHours(23, 59, 59, 59) - 7 * 8.64e7,
            terminal: '全部'
        },
        // 初始化全局筛选配置
        filtersConfig: {
            // timerRanger 时间段 time 单点时间
            timeType: 'timeRanger',
            // 是否显示终端
            terminalFlag: true,
            // 终端类型
            type: 'penType'
        }
    }
}

export default platform
```

5. `store` 配置

```js
import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import platform from './modules/state'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    platform
  },
  getters,
  actions,
  mutations
})
```