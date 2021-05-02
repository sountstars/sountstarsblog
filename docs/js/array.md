# Array方法 

[[TOC]]


### reduce()
+ reducer 函数接收4个参数:

  +    Accumulator (acc) (累计器,没有返回值为undefined)

  +    CurrentValue (cur) (当前值)

  +    CurrentIndex (idx) (当前索引)

  +    SourceArray (ary) (原数组)
```js
var arr = [3,9,4,3,6,0,9];

//求数组项之和
var sum = arr.reduce(function (prev, cur) {
    return prev + cur;
},0);

//求数组项最大值
var max = arr.reduce(function (prev, cur) {
    return Math.max(prev,cur);
});

Math.max(...arr);

//数组去重
var newArr = arr.reduce(function (prev, cur) {
    prev.indexOf(cur) === -1 && prev.push(cur);
    return prev;
},[]);
```
### slice()
 不会`修改数组`，而是返回一个子数组。如果想删除数组中的一段元素，应该使用方法 Array.splice()。
 + arr.slice(begin ,end?)
   +    （包含 begin，但不包含 end）。
   +    slice(1,4) 会提取原数组中从第二个元素开始一直到第四个元素的所有元素 （索引为 1, 2, 3的元素）。
```js
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
//[].slice.call(animals,1,3)

console.log(animals.slice(2));
// expected output: Array ["camel", "duck", "elephant"]

console.log(animals.slice(2, 4));
// expected output: Array ["camel", "duck"]

console.log(animals.slice(1, 5));
// expected output: Array ["bison", "camel", "duck", "elephant"]
```
### splice()
splice() 方法通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。

删除


```js

```

### filter() 实现
filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。

注意： filter() 不会对空数组进行检测。

注意： filter() 不会改变原始数组。

example   >>>  array.filter(function(currentValue,index,arr), thisValue)
```js
Array.prototype.selfFilter = function(callback, context) {
  // 不能是null调用方法
  if (this === null) {
    throw new TypeError(
      "Array.prototype.reduce" + "called on null or undefined"
    );
  }
  // 第一个参数必须要为function
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }
  // 获取数组
  let aArr = Array.prototype.slice.call(this);
  let _len = aArr.length;
  let aFArr = [];
  // 循环调用callback
  for (let i = 0; i < _len; i++) {
    if (!aArr.hasOwnProperty(i)) {
      continue;
    }
    callback.call(context, aArr[i], i, this) && aFArr.push(aArr[i]);
  }
  return aFArr;
};

```

<!-- ### some() & every()
```js
```

### some() & every()
```js
```

### some() & every()
```js
```

### some() & every()
```js
``` -->