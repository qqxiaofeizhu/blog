---
title: H5和App交互通信探究
date: 2021-02-18
tags:
 - jsBridge
categories:
 - mobile
---

## JsBridge实现

`jsBridge`是基于[WebViewJavascriptBridge](https://github.com/marcuswestin/WebViewJavascriptBridge)库及[WKWebViewJavascriptBridge](https://github.com/Lision/WKWebViewJavascriptBridge)来实现


```js
/**
 * @file bridge.js
 * 传统 webview 通信方案
 * callHandler H5调用APP注册的事件
 * registerhandler H5注册供APP调用的事件
 * navtive 解决方案 react-native || Weex
 */

let u = navigator.userAgent;
let customObj = null;
if (u.indexOf("custom") > -1) {
    let custom = u.substr(u.indexOf("custom") + "custom".length + 1, u.length).trim();
    customObj = {};
    custom.split(',').forEach(item => {
        let itemToArr = item.split(':');
        customObj[itemToArr[0]] = itemToArr[1];
    })
}

function setupWebViewJavascriptBridge(callback) {
    if (customObj && customObj['webviewLibrary'] === 'WKWebView') {
        if (window.WKWebViewJavascriptBridge) { return callback(WKWebViewJavascriptBridge); }
        if (window.WKWVJBCallbacks) { return window.WKWVJBCallbacks.push(callback); }
        window.WKWVJBCallbacks = [callback];
        window.webkit.messageHandlers.iOS_Native_InjectJavascript.postMessage(null)
    } else {
        document.addEventListener('WebViewJavascriptBridgeReady', () => callback(WebViewJavascriptBridge), false);
        window.WVJBCallbacks = [callback]
        let WVJBIframe = document.createElement('iframe')
        WVJBIframe.style.display = 'none'
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__'
        document.documentElement.appendChild(WVJBIframe)
        setTimeout(() => {
            document.documentElement.removeChild(WVJBIframe)
        }, 0)
        if (window.WebViewJavascriptBridge) {
            return callback(window.WebViewJavascriptBridge)
        }
        if (window.WVJBCallbacks) {
            return window.WVJBCallbacks.push(callback)
        }
    }
}

setupWebViewJavascriptBridge(bridge => {
    if (bridge.init) bridge.init();
})

export default {
    callHandler(name, data, callback) {
        setupWebViewJavascriptBridge(bridge => {
            bridge.callHandler(name, data, callback)
        })
    },
    registerHandler(name, callback) {
        setupWebViewJavascriptBridge(function (bridge) {
            bridge.registerHandler(name, (data, responseCallback) => {
                callback(data, responseCallback)
            })
        })
    }
}
```

基于promise封装

```js
import Bridge from './bridge.js';  // 基础的bridge文件

function JsBridge() {
    /**
     * @description 自定义传输数据 JS调用原生
    */
    JsBridge.prototype.jsCallApp = function (customData) {
        return new Promise((resolve) => {
            Bridge.callHandler('jsCallApp', customData, (appData) => {
                // 安卓的hack
                if (typeof appData == 'string') {
                    try {
                        appData = typeof JSON.parse(appData) == "object" ? JSON.parse(appData) : appData;
                    } catch (e) { } finally { }
                };
                resolve(appData);
            })
        })
    };

    /**
     * @description 自定义传输数据 app调用Js的方法
    */
    JsBridge.prototype.appCallJs = function (options) {
        let noop = () => { };
        let { code, success = noop, fail = noop, callHandlerToApp = noop } = options;
        let callback = (appData) => {
            if (appData['code'] == code) {
                success(appData);
            } else {
                fail(`找不到当前事件的定义！`)
            }
        };
        Bridge.registerHandler("appCallJs", (appData, callHandlerToApp) => {
            if (typeof appData == 'string') {
                try {
                    appData = typeof JSON.parse(appData) == "object" ? JSON.parse(appData) : appData;
                } catch (e) { } finally { }
            };
            callback(appData);
            callHandlerToApp();
        })
    }
}

export default new JsBridge();
```

## 封装

### jsCallApp

`jsCallApp`为`APP`中注册函数名称，`APP`根据`H5`发送`data`数据中的`code`值，返回给`H5 code`值对应的数据。

`H5`发送的`data`数据格式如下：

```js
data: {
    code: 表中code值, 所属定义事件的码值，具体参考码值表
    data: any 当前码值传递给APP的额外数据，可以为任何类型，具体的类型可以参考码值定义表
    desc: String 对应码值的描述信息
}
```

`APP`在接收到`H5`数据后，返回给`H5`数据格式如码值表`returns`所示

### appCallJs

`appCallJs`为`H5`中注册函数名称, `JS`根据`APP`发送`data`数据中的`code`值，返回给`APP`对应的数据。

`APP`发送的`data`数据格式如下：

```js
data: {
    code: 表中code值, 所属定义事件的码值，具体参考码值表
    data: any 当前码值传递给H5的额外数据，可以为任何类型，具体的类型可以参考码值定义表,
    desc: String 对应码值的描述信息
}
```

`H5`在接收到`APP`数据后，返回给`APP`数据格式如码值表`returns`所示
