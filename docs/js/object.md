# Object方法 

[[TOC]]


## 对象的数据属性
```js
var person = {}
Object.defineProperty(person,'name',{
    configurable:false,// 能否使用delete、能否需改属性特性、或能否修改访问器属性、，false为不可重新定义，默认值为true
    enumerable:false,// 不可枚举 对象属性是否可通过for-in循环，flase为不可循环，默认值为true
    writable:false,// 对象属性是否可修改,flase为不可修改，默认值为true
    value:'xiaoming' // 对象属性的默认值，默认值为undefined
});

// value
console.log(person);// xiaoming，默认value

// writable
person.name="666";
console.log(person);// xiaoming，不可修改value

// enumerable
for(var i in person){
    console.log(person[i]) // 无结果，不可循环
}
Object.keys(person) // []  与for in区别在于不能遍历出原型链上的属性
Object.getOwnPropertyNames(person) // ['name']

// configurable
delete person.name
console.log(person.name)// xiaoming，不可删除

Object.defineProperty(person,'name',{
    configurable:true // 不可修改，将抛出错误
});

// Object.getOwnPropertyDescriptors(person) // 返回自身所有的属性
Object.getOwnPropertyDescriptor(person,'name') // 返回自身属性
{
  configurable: false
  enumerable: false
  value: "xiaoming"
  writable: false
}
```

## Object.create()
描述：该方法创建一个新对象，将对象继承到__proto__属性上
格式：Object.create(proto[, propertiesObject])
用法：如果用传统的方法要给一个对象的原型上添加属性和方法，是通过 propt 实现的

通过构造函数
```js
//创建一个构造函数或者类
var People = function(){}
People.prototype.y = 20
People.prototype.z = 40
People.prototype.showNum = function() {}
//通过构造函数创建实例
var p = new People();
console.log(p.__proto__ === People.prototype) // true

//使用Object.create()
var proto = {
    y: 20,
    z: 40,
    showNum(){}
};
var o = Object.create(proto);
```

## Object.defineProperty()
Object.defineProperty(obj, prop, descriptor)

obj: 需要被操作的目标对象
prop: 目标对象需要定义或修改的属性的名称
descriptor: 将被定义或修改的属性的描述符
```js
var obj = new Object();

Object.defineProperty(obj, 'name', {
    configurable: false,
    writable: true,
    enumerable: true,
    value: '张三'
})

console.log(obj.name)  //张三
```

## Object.getPrototypeOf()  
描述：用于读取一个对象的原型对象；  

格式：Object.getPrototypeOf(obj);

用法：
```js
Object.getPrototypeOf('foo') === String.prototype === 'foo'.__proto__ // true
Object.getPrototypeOf(true) === Boolean.prototype === true.__proto__ // true
```

## Object.setPrototypeOf()
描述: Object.setPrototypeOf方法的作用与_proto_相同，用来设置一个对象的prototype对象，返回参数对象本身

格式：Object.setPrototypeOf(object, prototype)

该方法等同于下面的函数：
```js
function (obj, proto) {
  obj.__proto__ = proto;
  return obj;
}
```
**示例**
```js
let proto = {};
let obj = { x: 10 };
Object.setPrototypeOf(obj, proto);
 
proto.y = 20;
proto.z = 40;
 
obj.x // 10
obj.y // 20
obj.z // 40
```

## keys & values & entries
+ Object.keys 键
+ Object.values 值
+ Object.entries 组件二级数组
```js
const obj =  {
    address: "434343422",
    admin: "3434",
    adminCharater: '4444',
    adminRecord: '33',
    article: '22',
    artist: '11'
  }
  Object.entries(obj)// [["address", "434343422"]...]
  Object.keys(obj) //["address", "admin", "adminCharater", "adminRecord", "article", "artist"]
  Object.values(obj) //["434343422", "3434", "4444", "33", "22", "11"]
```

## Object 的 set 和 get 用法
在初始化对象的时候这样使用
```js
var obj={
    a: 1,
    b: 2,
    set c(x){console.log('c被赋值：',x);c=x;},
    get c(){console.log('c被取出: ',c);return c}  
};

obj.c=3  //c被赋值： 3
obj.c  //c被取出:  3
```
对象初始化之后可以这样添加属性
```js
var obj={
    a: 1,
    b: 2    
};

obj.__defineGetter__('c', function(){return c});
obj.__defineSetter__('c', function(x){c = x});
```
或者使用
```js
Objec(obj, c, {
　　set:function(x){
　　　　console.log('c被赋值：',x);
　　　　c=x
　　},
　　get:function(){
　　　　console.log('c被取出：',c)
　　　　return c
　　}
})
obj.c=3  //c被赋值： 3
obj.c  //c被取出:  3
```

## Object.fromEntries()
ES10新增  
接收一个键值对的列表参数,并返回一个带有这些键值对的新对象
```js
const entries = new Map([
  ['foo', 'bar'],
  ['baz', 42]
]);

const obj = Object.fromEntries(entries);

console.log(obj);
// expected output: Object { foo: "bar", baz: 42 }
```

## 浅拷贝/深拷贝
```js
//浅克隆 [层级嵌套不能超过2级,包括2级]
const clone = source => Object.assign({}, source)
const clone = source => { ...source }

//深克隆
function deepclone(obj){
   if (typeof obj === 'object' && obj !== null) {
    let o = obj.push?[]:{};
    console.log(obj.push);
    
    for(let attr in obj){
        if(obj.hasOwnProperty(attr)){
            if(typeof obj[attr] === 'object'){
                o[attr] = deepclone(obj[attr]);
            }else{
                o[attr] = obj[attr];
            }
        }
    }
    return o;
     } else {
    return obj;
  }
}

// or 取巧方法 JSON.parse(JSON.stringify());
// 注意这种取巧方法是有限制的
// 1. 只能解析Number、String、Array等能够被json表示的数据结构（无法拷贝一写特殊的对象，诸如 RegExp, Date, Set, Map，函数 等。）
// 2. 不能处理循环引用


const obj = {val:2};
obj.target = obj;

//拷贝obj会出现系统栈溢出，因为出现了无限递归的情况。

JSON.parse(JSON.stringify(obj));

//VM913:1 Uncaught TypeError: Converting circular structure to JSON
//--> starting at object with constructor 'Object'
//--- property 'target' closes the circle
//at JSON.stringify (<anonymous>)
//at <anonymous>:1:17
//(anonymous) @ VM913:1
 

//解决死循环的问题
const isObject = (target) => (typeof target === 'object' || typeof target === 'function') && target !== null;

const deepClone = (target, map = new Map()) => { 
    
  //如果有的话直接跳过
  if(map.get(target))  return target; 
 
  if (isObject(target)) { 
    map.set(target, true); 
    const cloneTarget = Array.isArray(target) ? []: {}; 
    for (let prop in target) { 
      if (target.hasOwnProperty(prop)) { 
          cloneTarget[prop] = deepClone(target[prop],map); 
      } 
    } 
    return cloneTarget; 
  } else { 
    return target; 
  } 
}
//map 和 a一直是强引用的关系， 在程序结束之前，a 所占的内存空间一直不会被释放。
//弱引用的对象可以在任何时候被回收，而对于强引用来说，只要这个强引用还在，那么对象无法被回收。

//ES6给我们提供了这样的数据结构，它的名字叫WeakMap,它是一种特殊的Map, 其中的键是弱引用的。`其键必须是对象`，而值可以是任意的


//稍微改造一下即可:
const deepClone = (target, map = new WeakMap()) => {
  //...
}
```

## 对象转原始类型是根据什么流程运行的？
对象转原始类型，会优先调用内置的[ToPrimitive]函数，对于该函数而言，其逻辑如下：

如果Symbol.toPrimitive()方法，优先调用再返回
调用valueOf()，如果转换为原始类型，则返回
调用toString()，如果转换为原始类型，则返回
如果都没有返回原始类型，会报错
```js
 const obj = {
  value: 3,
  valueOf() {
    return 4;
  },
  toString() {
    return '5'
  },
  [Symbol.toPrimitive]() {
    return 6
  }
}
console.log(obj + 1); // 输出7
```