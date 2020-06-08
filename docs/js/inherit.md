# 继承几种方式

[[TOC]]

```javascript
一个父类为前提条件
function Person (age) {
  this.age = age || 18
}
Person.prototype.sleep = function () {
  console.log('sleeping')
}
```

## 型链继承
```js
function Programmer() {}

Programmer.prototype = new Person ()
Programmer.prototype.code = function () {
  console.log('coding')
}

let jon = new Programmer()
jon.code() // coding
jon.sleep() // sleeping

jon instanceof Person // true
jon instanceof Programmer // true

Object.getPrototypeOf(jon) // Person {age: 18, code: ƒ}
jon.__proto__ // Person {age: 18, code: ƒ}

缺点：
无法向父类构造函数传参
父类的所有属性被共享，只要一个实例修改了属性，其他所有的子类实例都会被影响
```

## 借用构造函数
```js
function Programmer(name) {
  Person.call(this)
  this.name = name
}
let jon = new Programmer('jon')
jon.name // jon
jon.age // 18

jon.sleep() // Uncaught TypeError: jon.sleep is not a function
jon instanceof Person // false
jon instanceof Programmer // true

优点：
可以为父类传参
避免了共享属性

缺点：
只是子类的实例，不是父类的实例
方法都在构造函数中定义，每次创建实例都会创建一遍方法
```

## 组合继承
```js
组合 原型链继承 和 借用构造函数继承
function Programmer(age, name) {
  Person.call(this, age)
  this.name = name
}

Programmer.prototype = new Person()
Programmer.prototype.constructor = Programmer // 修复构造函数指向

let jon = new Programmer(18, 'jon')
jon.age // 18
jon.name // jon

let flash = new Programmer(22, 'flash')
flash.age // 22
flash.name // flash

jon.age // 18

jon instanceof Person // true
jon instanceof Programmer // true
flash instanceof Person // true
flash instanceof Programmer // true

优点：融合原型链继承和构造函数的优点，是 JavaScript 中最常用的继承模式
缺点：调用了两次父类构造函数
```

## ES6 extends
```js
// 父类
class Person {
  constructor(age) {
    this.age = age
  }
  sleep () {
    console.log('sleeping')
  }
}

// 子类
class Programmer extends Person {
  constructor(age, name) {
    super(age)
    this.name = name
  }
  code () {
    console.log('coding')
  }
}

let jon = new Programmer(18, 'jon')
jon.name // jon
jon.age // 18

let flash = new Programmer(22, 'flash')
flash.age // 22
flash.name // flash

jon instanceof Person // true
jon instanceof Programmer // true
flash instanceof Person // true
flash instanceof Programmer // true

优点：不用手动设置原型。

缺点：新语法，只要部分浏览器支持，需要转为 ES5 代码。
```