---
title: typescript学习 
date: 2021-01-10
tags:
 - typescript
categories:
 - typescript
---

TypeScript 是 JavaScript 的一个超集，主要提供了类型系统和对 ES6 的支持

<!-- more -->

# 什么是TypeScript

TypeScript 是 JavaScript 的一个超集，主要提供了类型系统和对 ES6 的支持

> TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. Any browser. Any host. Any OS. Open source.
TypeScript 是 JavaScript 的类型的超集，它可以编译成纯 JavaScript。编译出来的 JavaScript 可以运行在任何浏览器上。TypeScript 编译工具可以运行在任何服务器和任何系统上。TypeScript 是开源的。

## 类型

在typescript中，类型可以分为基本类型和枚举类型

### 基本类型

- 数字类型（number）
- 字符串类型（string）
- 布尔类型（boolean）
- 数组类型（array）
- 元组类型（tuple）
- 函数类型（fuction）
- 对象类型 (object)
- symbol类型
- void类型
- any类型
- null 和 undefined
- never类型

#### 数字类型

和JavaScript一样，TypeScript里的所有数字都是浮点数。 这些浮点数的类型是number。 除了支持十进制和十六进制字面量，TypeScript还支持ECMAScript 2015中引入的二进制和八进制字面量。

```ts
let num:number = 123;
num = 0b1101 // 二进制
num = 0o164 // 八进制
num = 0x8b // 十六进制
```

#### 字符串类型

和JavaScript一样，可以使用双引号（"）或单引号（'）表示字符串。

```ts
let str:string = 'wjs';
```

#### 布尔类型

```ts
let bool:boolean = true;
```

#### 数组类型

有两种方式可以定义数组。 第一种，可以在元素类型后面接上[]，表示由此类型元素组成的一个数组

```ts
let arr:number[] = [1,2,3];
let arr:string[] = ['1','2','3'];
let arr:(string|number)[] = [1,'2',3] // 数组中元素只能为string或者number类型
let arr:any[] = [1, '2', true]; // 数组中的元素为任意类型
```

第二种方式是使用数组泛型，Array<元素类型>：

```ts
let arr:Array<number>= [1,2,3];
let arr:Array<number|string>= [1, '2', '3'];
let arr:Array<any> = [1, '2', true];
```

#### 元组

数组中元素的数据类型都一般是相同的（any[] 类型的数组可以不同），如果存储的元素数据类型不同，则需要使用元组。

元组中允许存储不同类型的元素，元组可以作为参数传递给函数。

```ts
let x:[string, number];
x = ['123', 123];
x = [123, '123'] // error

或者

let x:[string, number] = ['123', 123];
```

其它的操作方法和数组一致

#### fuction

```ts
let func = (param?: type): type {};
```

#### object

```ts
let obj: {param: type} = {param: typeValue};
```

#### symbol

```ts
let sym:symbol = Symbol();
```

#### 空值 void

void类型像是与any类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是void

```ts
let a = ():void => {console.log('xxx')};
```

声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null;

```ts
let v:void;
v = undefined // OK
```

#### any

any表示当前变量可能是任何类型

```ts
let a:any = '123';
a = true;
a = [1,23,4];
```

尽量少的使用 any, 否则你可能在用 AnyScript 写代码

#### null 和 undefined

TypeScript里，undefined和null两者各自有自己的类型分别叫做undefined和null, 是string的子类型

```ts
let n:null = null;
let u:undefined: undefined;
```

#### never

never表示永不存在的值，出现在死循环或者异常程序中

```ts
function getError(message: string): never {
    throw new Error(message);
}
function infiniteFunc(): never {
    while (true) {}
}
```

### 枚举类型

- 数字枚举
- 字符串枚举
- 异构枚举
- 枚举成员
- 常量枚举
- 枚举/枚举成员作为类型

#### 数字枚举

没有初始化值，默认从0开始自增

```ts
enum Role {
    a,
    b, 
    c
}
// Role.a === 0;
// Role.c === 2;
```

当其中枚举成员赋值时，如果有枚举成员有数字初始化，则其后的成员会自动加一

```ts
enum Role {
    a,
    b = 5, 
    c
}
// Role.a === 0;
// Role.b === 5;
// Role.c === 6;
```

当枚举成员有字符串初始化，其后的成员必须为字符串初始化

```ts
enum Role {
    a,
    b = '5', 
    // c = 3; // 枚举成员必须具有初始化表达式
    c = 'wjs'
}
// Role.a === 0;
// Role.b === 5;
// Role.c === 'wjs';
```

#### 字符串枚举

在一个字符串枚举里，每个成员都必须用字符串字面量

```ts
enum Role {
    SUPER = '超级管理员',
    ADMIN = '管理员',
    USER = '用户'
}
```

#### 异构枚举

枚举可以混合字符串和数字成员

```ts
enum Answer {
    N,
    Y = 'yes'
}
```

除非你真的想要利用JavaScript运行时的行为，否则我们不建议这样做。

#### 枚举成员

1. 枚举成员是只读的，不可以被后续更改
2. 常量枚举在编译时被计算，非常量表达式，在运行时才会被计算
3. 常量枚举，在编译后被移除

#### 常量枚举

特性：会在编译阶段被移除
作用：当我们不需要一个对象，而需要这个对象的值时，就需要使用常量枚举，这样减少在编译环境的代码

```ts
const enum Month {
    Jan,
    Feb,
    Mar
}
const month:number[] = [Month.Jan, Month.Feb, Month]
```

#### 枚举类型

在某些情况下，枚举和枚举成员都可以作为一种单独类型存在。
第一种情况，枚举成员没有任何初始值；
第二种情况，所有成员都是数字枚举；
第三种情况，所有成员都是字符串枚举。

```ts
enum E { a, b }
enum F { a = 0, b = 1 }
enum G { a = 'apple', b = 'banana' }
```

### 类型断言

类型断言就是手动指定一个类型的值

类型断言有两种形式。 其一是“尖括号”语法

```ts
let str: any = "this is a string";
let strLength: number = (<string>str).length;
```

另一个使用**as**语法

```ts
let str: any = "this is a string";
let strLength: number = (str as string).length;
```

## 接口

接口是一个抽象类型，是抽象属性和方法的集合，用来规范对象、方法和类的行为

### 对象类型

对象的属性包含可选属性和只读属性，只读属性不允许被赋值

```ts
interface obj{
    name: string,
    age?: number,
    readonly sex: number
}

let obj:obj = {
    name: 'wjs',
    age: 25,
    sex: 1
}
// obj.sex = 0; // 无法分配到age, 因为它是只读属性
```

### 可索引接口

可索引的接口类型分为字符索引和数字索引，数字索引相当于数组，当两者混用时，数字签名的返回值必须是字符索引签名返回值的子类型

#### 数字索引

```ts
interface obj {
    [index: number]: number
}
let obj:obj {
    0:1,
    1:2,
    4:3
}
```

#### 字符串索引

```ts
interface obj {
    [x: string]: string | number
}

let obj:obj {
    'a': 0,
    'b': 'wjs'
}
```

#### 字符串和数字索引混用

```ts
interface obj {
    [index: number]: number,
    [x: string]: string | number
}

let obj:obj {
    0: 1,
    'a': 1,
    'b': 'wjs'
}
```

### 函数类型接口

接口不仅可以定义对象的形式，还可以定义函数形式

```ts
interface F {
    (name: string, age: number):void;
}
let f:F = (name, age) => {console.log(name, age)};

f('wjs', 25);
```

### 混合类型接口

一个对象既可以拥有属性，又可以拥有方法

```ts
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

fuction getCounter(): Counter {
  let counter = <Counter>function (start: number) { }; 
  // 或者写成这样 let counter = function (start: number) { } as Counter; 
  counter.interval = 123;
  counter.reset = function () { };
  return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```

### 类类型接口

1. 类必须实现接口中定义的所有属性
2. 接口只能约束类的公有成员，不能约束私有成员，受保护成员，静态成员及构造函数

### 接口继承

接口也可以实现继承，使用关键字 **extends**实现，通过继承可以抽离可重用的接口，将多个接口合并成一个接口

```ts
interface Fruit {
    name: string
}

interface Apple extends Fruit {
    color: string
}

let apple: Apple = {
    color: 'red',
    name: 'apple'
}

console.log(apple.color); // red
console.log(apple.name); // apple
```

### 接口继承类


## 函数

### 定义函数

### 函数传参数

### 函数重载

## 类

### 基本实现

### 继承

### 成员修饰符

### 构造函数中修饰符

### 抽象类

### this类型

## 泛型

### 支持多种泛型方法

### 泛型函数

### 泛型接口

### 泛型类

### 泛型约束

## 类型检查

### 类型推断

### 类型断言

### 类型兼容性

### 类型保护

## 高级类型

### 交叉类型

### 联合类型

### 字面量类型

### 索引类型

### 映射类型

### 条件类型