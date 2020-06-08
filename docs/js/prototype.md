# 原型 继承

[[TOC]]



## 原型链

```js
基于原型链的继承，包括继承属性和继承方法（函数），其中函数的继承与属性继承没有差别，
任何函数都可以添加到对象上作为对象的属性。
```

```js
每个对象都有一个私有属性（非标准属性：__proto__，应通过 Object.getPrototypeOf() 获取）
指向它的构造函数的原型对象 （prototype）——「它的构造函数的原型对象」也有一个自己
的原型对象 (__proto__) ，以此类推直到一个对象的原型对象为 null 。

null 没有原型，null 是原型链中最后一环。

function Child(){
    this.name = 'xiaoyu'
}
const child = new Child()

child.__proto__ === Child.prototype // > true
// 等同于：
Object.getPrototypeOf(child) === Child.prototype // > true


child.__proto__.__proto__.__proto__  // > null

=============================================
function Father(name){
// 属性
    this.name = name || 'father',
// 实例方法
    this.sleep = function(){
    console.log(this.name+"正在睡觉")；
    }
}
// 原型方法
Father.prototype.look = function(book){
console.log(this.name + "正在看:" + book);
}

```

## 原型链继承
```js
将父类的实例作为子类的原型(并不是把父类中的属性和方法克隆一份一模一样的给子类，
而是让子类父类之间增加了原型链接)
特点：父类中私有的和公有的都继承到了子类原型上(子类公有的)

function Son(){
}
Son.prototype = new Father()  // 相当于重写了Son的原型
Son.prototype.constructor = Son; //  一定要把Son原型上的contructor重新指向Son

var son = new Son()
console.log(son.sleep()) // father正在睡觉
console.log(son.look('TV')) // father正在看TV
```

## call继承(构造继承)
```js
使用父类的构造函数来增强子类实例
把父类私有的属性和方法，克隆一份一样的给子类私有的属性，Father执行的时候，
把Father的中的this换成Son的实例，由于并不是new Father，所以Father.prototype上的属性无关

function Son(name){
    Father.call(this)
    this.name = name
}
var son = new Son('son')
console.log(son.sleep()) //son正在睡觉
console.log(son.look('TV')) // son正在看TV
```

## 冒充对象继承
```js
使用父类的构造函数来增强子类实例
把父类私有的和公有的克隆一份一样的给子类
function Son(){
    var temp = new Father()
    for(var k in temp){
        this[k] = temp[k]
    }
    temp = null
}

var son = new Son()
console.log(son.sleep()) // father正在睡觉
console.log(son.look('TV')) // father正在看TV
```

## 混合模式继承： 原型继承+call继承
```js
通过调用父类构造，继承父类的属性并保留传参的优点，然后通过将父类实例作为子类原型，实现函数复用
把父类私有的和公有的都变成了子类共有的，但是调用了两次父类构造函数，生成了两份实例

function Son(){
    Father.call(this)
}
Son.prototype = new Fahter();
Son.prototype.constructor = Son;

var son = new Son()
console.log(son.sleep()) // father正在睡觉
console.log(son.look('TV')) // father正在看TV
```

## 寄生组合式继承
```js
通过寄生方式，去掉父类的实例属性，这样，在调用两次父类的构造的时候，就不会初始化两次实例方法/属性，避免的组合继承的缺点

function Son(){
    Father.call(this)
}
Son.prototype = createObject(Father.prototype)
Son.prototype.constructor = Son;

function createObject(o){
    function fn(){}
    fn.prototype = o;
    return new fn;
}
```




//评测题目: 无
flexbox:


<div class="flex">
  <div class="column"></div>
  <div class="column"></div>
  <div class="column"></div>
</div>

.flex {
  display: flex;
  justify-content: flex-start;
}
.column {
  background-color: blue;
  width: 70px;
  margin: auto;
  height: 70px;
}

网页置灰效果实现
body {
	
}

img 
div


js

es6/7
  
let const var
let a = {};
const b = {};
a.a = 1;//ok
b.b = 1;//error
a = b; //ok
b = a; // error

setTimeout(()=>{
  setTimeout(()=>{
    setTimeout(()=>{
      console.log('timeout')
    }, 0);
  }, 0);
}, 1000);

let result = new promise((rosole,reject)=>{
  reject()
})

  result.then(()=>{}).then(()=>{}).then(()=>{
  	console.log()
  })
  
  
new Promise((resolve)=>{
  //code1
  xhr(()=>{
    //code2
    resolve();
    //code3
  })
  //code4
}).then(()=>{
  //code5
  console.log('done')
}).catch(()=>{
  //
  //error
  console.error('error');
})
  
  
Promise.all([p1,p2,p3]).then(()=>{
  //
})
  
Promise

Proxy

const arr = [];
for(; i< length;){
  break;
}

for of / in

const obj = {a: 1, b: 1}
for(key in obj)
  

obj
for o of obj {
  
}

()=>{} vs function(){}

const foo = ()=>{
  console.log(this);
}

const obj = {foo};

obj.foo();//obj

foo();// window

const context = {};
foo //context
  
call apply bind

function foo(){
	console.log(this);
}

class A {
	constructor(props){
    	this.name = props.name
    }
    
    log(){
    	console.log('A.log');
    }
}

class B extends A {
	constructor(props){
    	super({nameL:'Tom'})
    }
    
    log(){
    	console.log('B.log');
    }
}

const b = new B();
b.log();// B.log A.log

async/await

async function exec(){
	console.log('start');
    
    await 1;
    await true;
    await null;
    await function(){}
    
   
    
    console.log('end');
}

exec()


setTimeout(function () {
	console.log(1);
}, 0)

new Promise((resolve)=>{
	console.log(4);
	resolve()
}).then(()=>{
	console.log(2);
});

setTimeout(function () {
	Promise.resolve().then(function () {
		console.log(3);
	})
}, 0)
  
//4 1 2 3 
  
  
  

整数数组，找出乘积最大的三个元素
arr arr = [10,30,5,8,-3,-6,54,...];

ary = [-10, -9,0 ,1,2,3，9, 10,100, 200]
arr = arr.sort();

[-10, -9, 0 , 1,2, 3]







