let a = () => { return 'xxx' };

console.log(a.__proto__);
console.log(a.prototype) // 不存在原型对象

let b = true;
console.log(b.__proto__ == Boolean.prototype)

let c = new String('123');
console.log(c.__proto__ == String.prototype)
console.log(c instanceof String);

let isType = type => obj => {
    return Object.prototype.toString.call(obj) === '[object ' + type + ']'
}; // 函数科里化

console.log(isType('Number')(123))

console.log([] instanceof Array);

console.log({} instanceof Object);

// js难点 继承 继承可以使子类的实例使用在父类中定义的属性和方法

// 1. 原型链方式继承

// 可以访问父类的属性和方法，但是不能传递参数，无法实现多继承

function Person() {
    this.a = 'lly';
}

Person.prototype.sayHello = function (name) {
    console.log(name, 'xxx')
};

function Child() {};

Child.prototype = new Person();

let child = new Child();

console.log(child.a)
console.log(child.sayHello('wjs'));
