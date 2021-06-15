---
title: JavaScript篇
---

### js 的基本数据类型有哪些

```js
undefined null Boolean String Number Symbol BigInt // 基本数据类型
Object  //引用数据类型
```

### 如何判断一个变量的类型

```js
typeof 可以判断出 undefined Boolean String Number Symbol
instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。 也可以理解为是否为某个对象的实例
也可以理解为是否为某个对象的实例
Object.prototype.toString.call 最合适判断
let isType = type => obj => Object.prototype.toString.call(obj) === '[object ' + type + ']';
```

### 数组常用的操作有哪些，都有什么含义怎么使用

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

### 数据的拷贝有哪些方式

```js
JSON.parse(JSON.stringify()); // 深拷贝
Object.assign(target, source); // 第一层为深拷贝，其它的为浅拷贝
... // es6扩展运算符号，和Object.assign一样
手动实现的deepCopy
```

### 深拷贝实现

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

### this绑定的5种方式

1.显式绑定 call apply bind

this的显式绑定call()、bind()、apply()

2.隐式绑定 对象下

当函数被一个对象所“包含”的时候，我们称函数的this被隐式绑定到这个对象里面，这时候，通过this可以直接访问所绑定的对象里面的其他属性

3.默认绑定 指向window

当一个函数没有明确的调用对象的时候，也就是单纯作为独立函数调用的时候，将对函数的this使用默认绑定：绑定到全局的window对象,凡是函数作为独立函数调用，无论它的位置在哪，它行为表现都和直接在全局环境中调用无异

4.new操作符绑定

执行new操作的时候，将创建一个新的对象，并且将构造函数的this指向所创建的新对象

5.箭头函数绑定

箭头函数是没有this的，箭头函数中的this只取决于包裹箭头函数的第一个普通函数的this

在严格模式下函数体内的this指向undefined;

### call, apply, bind

call、apply、bind的作用是改变函数运行时this的指向

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
    let self = this;
    let args = [...arguments].slice(1);

    return function F() {
        if (this instanceof F) {
            return new _self(...args, ...arguments)
        }
        return self.apply(context, args.concat([...arguments]))
    }
}
```

### setTimeout Promise async await的区别

setTimeout 是定时器，在事件循环机制中属于宏任务，在指定时间后执行callback函数

Promise 是同步的立即执行函数，只有在执行resolve和reject才是异步任务，属于事件循环机制中的微任务，Promise 拥有三个状态（pedding, resolve, reject），且状态一旦发生改变就会固定下来

async await 是generator 的语法糖， async 返回的是一个promise函数，遇到await 就会先返回await的结果，再继续向下执行，将主线程让出


### 偏函数 & 函数柯里化

偏函数(局部应用)是固定一个函数的一个或者多个参数，也就是将一个 n 元函数转换成一个 n - x 元函数。

柯里化是将一个多参数函数转换成多个单参数函数，也就是将一个 n 元函数转换成 n 个一元函数。

什么是元？元是指函数参数的个数，比如一个带有两个参数的函数被称为二元函数。

偏函数(局部应用) 和 函数柯里化 尽管很像，但是却是js中两种处理函数的技术。

```js
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

### 高阶函数

满足这两个任一一个条件

1. 接收一个或多个函数作为输入[函数被作为参数传入]

2. 函数作为输出结果

常见的高阶函数

闭包，map，filter, reduce, sort[升降序]

高阶函数的好处

### promise

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

### 实现一个Promise

```js

const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

function MyPromise(fn) {
    const that = this
    this.state = PENDING

    // value 变量用于保存 resolve 或者 reject 中传入的值
    this.value = null

    // 用于保存 then 中的回调，因为当执行完 Promise 时状态可能还是等待中，这时候应该把 then 中的回调保存起来用于状态改变时使用
    that.resolvedCallbacks = []
    that.rejectedCallbacks = []

    function resolve(value) {
        // 首先两个函数都得判断当前状态是否为等待中
        if(that.state === PENDING) {
            that.state = RESOLVED
            that.value = value

            // 遍历回调数组并执行
            that.resolvedCallbacks.map(cb=>cb(that.value))
        }
    }
    function reject(value) {
        if(that.state === PENDING) {
            that.state = REJECTED
            that.value = value
            that.rejectedCallbacks.map(cb=>cb(that.value))
        }
    }
    // 完成以上两个函数以后，我们就该实现如何执行 Promise 中传入的函数了
    try {
        fn(resolve,reject)
    } catch(e){
        reject(e)
    }
}

// 最后我们来实现较为复杂的 then 函数
MyPromise.prototype.then = function(onFulfilled,onRejected){
  const that = this

  // 判断两个参数是否为函数类型，因为这两个参数是可选参数
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
  onRejected = typeof onRejected === 'function' ? onRejected : e => { throw e }

  // 当状态不是等待态时，就去执行相对应的函数。如果状态是等待态的话，就往回调函数中 push 函数
  if(this.state === PENDING) {
      this.resolvedCallbacks.push(onFulfilled)
      this.rejectedCallbacks.push(onRejected)
  }
  if(this.state === RESOLVED) {
      onFulfilled(that.value)
  }
  if(this.state === REJECTED) {
      onRejected(that.value)
  }
}
```


### 原型链

1、除了null,undefined 之外的所有对象都有一个__proto__属性

2、所有的函数（除了箭头函数）都有一个prototype属性

3、除了null,undefined 之外的所有对象__proto__属性值指向它的构造函数的 prototype 属性值

原型是用来继承类的属性和方法

proto 将每个对象串联起来，形成的链条，称为原型链，原型链的终点是null

```js
实例化.__proto__ == 类.prototype  类.prototype.constructor == 类;
```

### js继承

```js

许多OOP语言(面向对象语言)，都有支持两种继承方式：接口继承 & 实现继承。
接口继承 继承的是 方法签名，实现继承 继承的是实际的方法。
由于js中方法没有签名，所以在es中无法实现接口继承，es只支持实现继承，而且其实现继承主要是依靠原型链 来实现的。

js中继承大体有以下6种：
// 定义一个动物类
function Animal (name) {
　　// 属性
　　this.name = name || 'Animal';
　　// 实例方法
　　this.sleep = function(){
　　console.log(this.name + '正在睡觉！');
　　}
}

Animal.prototype.eat = function(food) {
　　console.log(this.name + '正在吃：' + food);
};

原型继承

function Cat() {}
Cat.prototype = new Aniaml();

缺点：1. 子类的实例不能向父类传递参数
     2. 引用类型的属性被所有实例共享

借用构造函数继承

function Cat() { Aniaml.aplly(this, arguments) };

缺点：1. 方法都在构造函数中定义，每次创建实例都会创建一遍方法
     2. 不能继承到父类原型上的属性和方法

组合继承

function Cat() { Aniaml.aplly(this, arguments) };
Cat.prototype = Aniaml.prototype;

缺点：1. 调用了两次父类，占用的内存较大

原型式继承 类 Object.create;

function create(f) {
    function F() {};
    F.prototype = f;
    return new F();
}

缺点： 包含引用类型的属性值始终都会共享相应的值

寄生式继承

function parasitism(f) {
    let _f = create(f);
    return _f;
}

缺点：跟借用构造函数模式一样，每次创建对象都会创建一遍方法。

寄生组合式继承

function crate(f) {
    function F() {};
    F.prototype = f;
    return new F();
}

function Cat() {
    Aniaml.apply(this, arguments);
}

Cat.prototype = crate(Aniaml.prototype);
Cat.prototype.constructor = Cat;

Es6 中的 class 继承

class Cat extends Aniaml {
    constructor() {
        super(...arguments)
    }
} 
```

### 作用域及作用域链

ES5作用域分为全局作用域以及函数作用域, ES6中作用域又增加了一个块级作用域

作用域链是指当前作用域没有找到定义的方法或者变量、继续向父级作用域继续寻找，直到找到全局作用域为止，这种层级的查找关系，称为作用域链

### 执行上下文

JS执行上下文分为全局执行上下文和函数执行上下文

1、全局执行上下文

在解析js代码时，创建一个全局的执行上下文环境，把代码中即将执行的（函数内部不算）变量、函数声明都拿出来，先声明再赋值

2、函数执行上下文

与全局执行上下文之间的区别就是多了this指针以及arguments参数， this的指向在函数执行时已经被确定了

### 为什么遇到script标签，会阻塞渲染

js是单线程，多线程模式，常见的线程包含GUI线程，JS引擎线程，事件触发线程，定时触发器线程，HTTP线程，其中JS引擎线程和GUI引擎线程互斥，当解析JS时，GUI会被挂起

### 节流和防抖

节流：指连续触发事件但是在 n 秒中只执行一次函数

常用场景：鼠标不断点击触发，mousedown(单位时间内只触发一次); 监听滚动事件，比如是否滑到底部自动加载更多，用throttle来判断

```js
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
```

防抖：就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。

常用场景：search搜索联想，用户在不断输入值时，用防抖来节约请求资源；window触发resize的时候，不断的调整浏览器窗口大小会不断的触发这个事件

```js
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

### var 和 不用 var 声明的区别

使用var声明的变量的作用域是它当前的执行上下文，可以是局部变量也可以式全局变量

给未声明的变量赋值，该变量被隐式的创建为全局对象下的属性，可以用delete删掉

### 下面的代码打印什么内容，为什么？

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


### new 操作符都做了什么，如何实现
```js
1. 新生成了一个对象
2. 链接到原型
3. 绑定 this
4. 返回新对象

function create() {
  let obj = {}
  let Con = [].shift.call(arguments)
  obj.__proto__ = Con.prototype
  let result = Con.apply(obj, arguments)
  return result instanceof Object ? result : obj
}
```

### 结构赋值的常用法

```js
1. 数组解构
2. 对象解构
3. 函数参数解构
4. 加载函数模块，函数方法解构 
5. 数值和布尔的结构 
```
