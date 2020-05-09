---
title: 集合 
sidebar: false
date: 2020-04-20
tags:
 - struct
categories:
 - struct
---

## 代码实现

```js
class Set {
    constructor() {
        this.items = {};
    }

    add(value) {
        if (this.has(value)) {
            return false;
        }
        this.items[value] = value;
        return true;
    }

    has(value) {
        return this.items.hasOwnProperty(value)
    }

    remove(value) {
        if (!this.has(value)) {
            return false;
        }

        delete this.items[value];
        return true;
    }

    size() {
        return this.values().length;
    }

    clear() {
        this.items = {};
    }

    values() {
        return Object.keys(this.items)
    }

    // 并集 先将集合A中的所有元素添加到集合C中，再遍历集合B，如果是集合C所没有的元素就把它添加到集合C中。
    union = otherSet => {
        let unionSet = new Set();
        let values = this.values();
        for (let i = 0; i < values.length; i++) {
            unionSet.add(values[i])
        }
        values = otherSet.values();
        for (let i = 0; i < values.length; i++) {
            unionSet.add(values[i])
        }
        return unionSet;
    }

    // 交集 遍历集合A，当取得的元素也存在于集合B时，就把该元素添加到另一个集合C中。
    intersection = otherSet => {
        let intersectionSet = new Set();
        let values = this.values();
        for (let i = 0; i < values.length; i++) {
            let item = values[i];
            if (otherSet.has(item)) {
                intersectionSet.add(item);
            }
        }
        return intersectionSet;
    }

    // 差集 遍历集合A，当取得的元素不存在于集合B时，就把该元素添加到另一个集合C中。
    difference = otherSet => {
        let differenceSet = new Set();
        let values = this.values();
        for (let i = 0; i < values.length; i++) {
            let item = values[i];
            if (!otherSet.has(item)) {
                differenceSet.add(item)
            }
        }
        return differenceSet;
    }

    // 子集 遍历集合A，当取得的元素中有一个不存在于集合B时，就说明集合A不是集合B的子集，返回false。
    subset = otherSet => {
        let values = this.values()
        for (let i = 0; i < values.length; i++) {
            let item = values[i]
            if (!otherSet.has(item)) {
                return false
            }
        }
        return true
    }
}
```