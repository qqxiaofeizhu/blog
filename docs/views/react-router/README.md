---
title: react-router第一弹(基础篇)
date: 2021-02-18
tags:
 - react-router
categories:
 - react
---

react-router API学习

[参考链接](https://reactrouter.com/web/guides/quick-start)

<!-- more -->

## React Router

`React Router` 对外暴露了高级路由器，浏览器端主要使用的是 `BrowserRouter` 和 `HashRouter`

-   BrowserRouter 浏览器自带的 H5 API, restful 风格，SPA 应用在刷新时会 404，需要后台配置或者前端自己配置
-   HashRouter 使用 hash 方式进行路由,路径后均有#，不更改浏览器的 path，通过更改 hash 值来加载对应的组件
-   MemoryRouter 在内存中管理 history ，地址栏不会变化。在 reactNative 中使用。
-   NativeRouter react-native 中使用(a `<Router>` for iOS and Android apps built using React Native)
-   StaticRouter 服务端渲染

## API

-   BrowserRouter
-   HashRouter
-   Link
-   NavLink
-   Prompt
-   Redirect
-   Route
-   Router
-   Switch
-   generatePath
-   history
-   location
-   match
-   matchPath
-   withRouter
-   useHistory(hooks)
-   useLocation(hooks)
-   useParams(hooks)
-   useRouteMatch(hooks)

### useHistory(hooks)

用于在组件内部访问 history 方法

```jsx
import React from 'react';
import {useHistory} from 'react-router-dom';

function ComponentA() {
    let history = useHistory();
    return <button onClick={() => history.push('/home')}>Home Page</button>;
}
```

### useLocation(hooks)

返回 location 代表当前 URL 的对象。您可以将其视为类似于 URL 更改时 useState 会返回新值的 location。

```jsx
import React from 'react';
import {useLocation} from 'react-router-dom';

function ComponentA() {
    let location = useLocation();
    // location <===> {
    //     hash: ""
    //     pathname: pathname
    //     search: ""
    //     state: undefined
    // }
    return <></>;
}
```

### useParams(hooks)

useParams 返回 URL 参数的键/值对的对象。使用它访问匹配.params 当前`<Route>`。

```jsx
import React from 'react';
import {useParams} from 'react-router-dom';

function ComponentA() {
    let urlParams = useParams();
    // urlParams <===> {
    //     arg1: xxx,
    //     arg2: xxx
    // }
    return <></>;
}
```

### useRouteMatch(hooks)

useRouteMatch 钩子尝试以与`<Route>`相同的方式匹配当前 URL。它主要用于访问匹配数据，而无需实际渲染`<Route>`。

后期补充，暂时看不出来其用法

### Link 常用

在应用程序周围提供声明性的、可访问的导航。

- to: string | object | function

```jsx
// string
<Link to="/courses?sort=name" />
// object
<Link
  to={{
    pathname: "/courses",
    search: "?sort=name",
    hash: "#the-hash",
    state: { fromDashboard: true }
  }}
/>
// function
<Link to={location => `${location.pathname}?sort=name`} />
```

- replace: bool (如果为true，则单击链接将替换历史堆栈中的当前条目，而不是添加新条目)
- innerRef: function | RefObject
- component: React.Component   (使自定义的a标签，感觉一般用不到)

### NavLink 常用

`<Link>`的一个特殊版本，当呈现元素与当前URL匹配时，它将向呈现元素添加样式属性，继承Link的props

- activeClassName: string (当元素处于活动状态时提供该元素的类。)
- activeStyle: object (当元素处于活动状态时应用于该元素的样式。)
- exact: bool  (如果为true，则仅当位置完全匹配时才应用活动类/样式。)
- strict: bool (严格匹配)
- isActive: func (添加额外逻辑以确定链路是否处于活动状态的函数。如果您想做的不仅仅是验证链接的路径名是否与当前URL的路径名匹配，那么应该使用此选项。)

```jsx
<NavLink
  to="/events/123"
  isActive={(match, location) => {
    if (!match) {
      return false;
    }
    const eventID = parseInt(match.params.eventID);
    return !isNaN(eventID) && eventID % 2 === 1;
  }}
>
  Event 123
</NavLink>
```

- location: object (不咋用)
- aria-current: string (不咋用)

### Prompt

用于在离开页面之前提示用户, 通过设置 when 的值来打开或者关闭 Prompt 功能

```jsx
// 基础
<Prompt
  when={formIsHalfFilledOut}
  message="Are you sure you want to leave?"
/>

// 回掉
<Prompt
  message={(location, action) => {
    if (action === 'POP') {
      console.log("Backing up...")
    }
    return location.pathname.startsWith("/app")
      ? true
      : `Are you sure you want to go to ${location.pathname}?`
  }}
/>
```

### Redirect 常用

渲染`<Redirect>`将导航到新位置。新位置将覆盖历史堆栈中的当前位置，就像服务器端重定向（http3xx）一样。

- to: string | object 跳转的地址
- push: bool (如果为true，重定向会将新条目推送到历史记录上，而不是替换当前条目。)
- form: string (只在switch下有用, 如果当前是它，则立即跳转到它)
- exact: bool (完全匹配)
- strict: bool (严格匹配；相当于路线)
- sensitive: bool (区分大小写匹配；相当于路由敏感.)
 
### Route 常用

作用：在路径匹配时呈现 UI 组件（核心）

-   component

```jsx
<Route path="/user/:username" component={User} />
```

-   render

```jsx
<Route path="/home" render={() => <div>Home</div>} />
```

-   children

```jsx
<Route
    path={to}
    children={({match}) => (
        <li className={match ? 'active' : ''}>
            <Link to={to} {...rest} />
        </li>
    )}
/>
```

-   path: string | string[]

匹配到路径展示对应的 UI 组件

```jsx
// string
<Route path="/users/:id">
  <User />
</Route>
// string[]
<Route path={["/users/:id", "/profile/:id"]}>
  <User />
</Route>
```

-   exact: boolean (准确匹配到当前的路径)

```js
path	location.pathname	exact	matches?
/one	/one/two	        true	no
/one	/one/two	        false	yes
```

-   strict: boolean (使用严格的路径匹配规则)

```js
path	location.pathname	matches?
/one/	/one	            no
/one/	/one/	            yes
/one/	/one/two	        yes
```

-   sensitive（敏感地）: boolean (严格区分大小写)

```js
path	location.pathname	matches?
/one	/one	            yes
/one	/one/	            no
/one	/one/two	        no
```

- location: object 没用过

### Router

所有路由器组件的通用底层接口

### switch 常用

作用：渲染与位置匹配的第一个子级`<Route>`或`<Redirect>`。

### generatePath

generatePath 函数可用于生成路由的 URL。内部使用 regexp 库的路径。

### withRouter

高阶路由组件，可以向包裹的组件传递 match, location, history 属性

```jsx
class ShowTheLocation extends React.component {
    static propsTypes = {
        match: PropTypes.object.match,
        location: PropTypes.object.location,
        history: PropTypes.object.history
    };
}
const ShowTheLocationWithRouter = widthRouter(ShowTheLocation);
```

被 withRouter 处理过后的组件拥有两个属性

-   Component.WrappedComponent (不懂如何使用)

```jsx
// MyComponent.js
export default withRouter(MyComponent)
// MyComponent.test.js
import MyComponent from './MyComponent'
render(<MyComponent.WrappedComponent location={{...}} ... />)
wrappedComponentRef: func
```

-   wrappedComponentRef: func (不懂如何使用) 作为 ref prop 传递给包装组件的函数。

```jsx
class Container extends React.Component {
    componentDidMount() {
        this.component.doSomething();
    }
    render() {
        return <MyComponent wrappedComponentRef={c => (this.component = c)} />;
    }
}
```
