# for in和for of区别 

[[TOC]]

## for in
以任意顺序遍历一个对象的[可枚举属性](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Enumerability_and_ownership_of_properties)。遍历数组时，key为数组下标字符串；遍历对象，key为对象字段名。

### 数组
```js
let arr = [1, 2];

for (let key in arr) {
    console.log(arr[key]); // 会正常打印 1, 2
}

// 但是如果在 Array 原型链上添加一个方法
Array.prototype.test = function() {};

for (let key in arr) {
    console.log(arr[key]); // 此时会打印 1, 2, ƒ () {}
}
```

### 对象
```js
let obj = {f1: 'test1', f2: 'test2'}
for (let key in obj) {
    console.log(key, obj[key])
}
// 打印
// f1 test1
// f2 test2
```

### for in 缺点
1. for in 迭代顺序依赖于执行环境，不一定保证顺序
2. for in 不仅会遍历当前对象，还包括原型链上的可枚举属性
4. for in 不适合遍历数组，主要应用为对象

### Object.keys()和for in的区别
+ for in区别在于`不能遍历出原型链`上的属性；

## for of
ES6引入的新语法。在`可迭代对象`（包括 Array，Map，Set，String，TypedArray，arguments对象，NodeList对象）上创建一个迭代循环,调用自定义迭代钩子，并为每个不同属性的值执行语句。
`Object对象不是可迭代对象，故for of 不支持`

### 数组
```js
let arr = [{age: 1}, {age: 5},]
for(let {age} of arr) {
    console.log(age)
}
// 打印
// 1
// 5
```

### for of 优点
1. for of 有与for in 一样的简洁语法（这也是两者容易混乱的点），但没有for in的缺点
2. for of 保证顺序且不会仅遍历当前对象
