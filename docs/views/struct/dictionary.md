---
title: 字典 
sidebar: false
date: 2020-04-20
tags:
 - struct
categories:
 - struct
---

## 代码实现

```js
class Dictionary {
    constructor() {
        this.items = {}
    }

    set(key, value) {
        this.items[key] = value;
    }

    has(key) {
        return this.items.hasOwnProperty(key);
    }

    get(key) {
        return this.items[key]
    }

    size() {
        return this.keys().length
    }

    remove(key) {
        if (!this.has(key)) {
            return false
        }
        delete this.items[key];
        return true;
    }

    clear() {
        this.items = {};
    }

    keys() {
        return Object.keys(this.items)
    }

    values() {
        let values = [];
        for (let i = 0; i < this.keys(); i++) {
            values.push(this.get(i))
        }
        return values;
    }
}
```