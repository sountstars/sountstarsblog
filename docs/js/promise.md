# Promise && async

[[TOC]]

## Promise
+ 主要用于异步计算
+ 可以将异步操作队列化，按照期望的顺序执行，返回符合预期的结果
+ 可以在对象之间传递和操作promise，帮助我们处理队列
+ 避免回调地狱,让代码可读性更强

## 实现一个简单的Promise
+ Promise中的resolve和reject用于改变Promise的状态和传参，then中的参数必须是作为回调执行的函数。
+ 因此，当Promise改变状态之后会调用回调函数，根据状态的不同选择需要执行的回调函数。
```js
function Promise(fn){
  var status = 'pending'
  function successNotify(){
      status = 'fulfilled'//状态变为fulfilled
      toDoThen.apply(undefined, arguments)//执行回调
  }
  function failNotify(){
      status = 'rejected'//状态变为rejected
      toDoThen.apply(undefined, arguments)//执行回调
  }
  function toDoThen(){
      setTimeout(()=>{ // 保证回调是异步执行的
          if(status === 'fulfilled'){
              for(let i =0; i< successArray.length;i ++)    {
                  successArray[i].apply(undefined, arguments)//执行then里面的回掉函数
              }
          }else if(status === 'rejected'){
              for(let i =0; i< failArray.length;i ++)    {
                  failArray[i].apply(undefined, arguments)//执行then里面的回掉函数
              }
          }
      })
  }
  var successArray = []
  var failArray = []
  fn.call(undefined, successNotify, failNotify)
  return {
      then: function(successFn, failFn){
          successArray.push(successFn)
          failArray.push(failFn)
          return undefined // 此处应该返回一个Promise
      }
  }
}

```

process.nextTick > promise.then > setTimeout > setImmediate
```js
setImmediate(function(){
    console.log(1);
},0);
setTimeout(function(){
    console.log(2);
},0);
new Promise(function(resolve){
    console.log(3);
    resolve();
    console.log(4);
}).then(function(){
    console.log(5);
});
console.log(6);
process.nextTick(function(){
    console.log(7);
});
console.log(8);

//结果是：3 4 6 8 7 5 2 1
```

## Generator
+ generator也是为了解决地狱回调问题的，和promise一样都是为了实现异步编程，本质还是各种回调
+ generator为es6中新定义的数据类型，这种数据类型和函数很像，每个函数只能返回一个结果，即只能return一次， 如果在某些函数中没有看到return，其实质在函数结尾是存在一个隐藏的return undefined 的，而generator不同，可以返回多次
```js
function* gen(){
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    return "结束";
}

let g = gen();
let i = 0;
let timer = setInterval(() => {//每间隔500ms执行一次g.next()，执行7次，并在控制台打印
      i++;
      console.log(g.next()); //执行gen函数
      if(i>7){
          clearInterval(timer);
      }
}, 500);

try{
  g.throw(new Error('test1'))
}catch(e){
  console.log(e)
}
```
上述例子 可以看出generator 遇到yleld就会暂停，只有当调用`generator.next()`才会向下执行， 调用这个方法会返回`{value: x, done: true/false}`,这个对象中value是yield的返回值， done表示generator是否执行结束，只有当执行到return时，这个对象中的done才会变成true，说明执行结束


## async await
原理就是利用 generator（生成器）分割代码片段。然后我们使用一个函数让其自迭代，每一个yield 用 promise 包裹起来。执行下一步的时机由 promise 来控制

而且相较于Promise,async的优越性就是把每次异步返回的结果从then中拿到最外层的方法中，不需要链式调用，只要用同步的写法就可以了。 更加直观而且，更适合处理并发调用的问题。但是async必须以一个Promise对象开始 ，所以async通常是和Promise结合使用的
 <!-- + Generator 函数的语法糖 -->
 <!-- + async函数就是将 Generator 函数的星号（*）替换成async，将yield替换成await -->
```js
function _asyncToGenerator(fn) {
  return function() {
    var self = this,
      args = arguments;
    // 将返回值promise化
    return new Promise(function(resolve, reject) {
      // 获取迭代器实例
      var gen = fn.apply(self, args);
      // 执行下一步
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
      }
      // 抛出异常
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
      }
      // 第一次触发
      _next(undefined);
    });
  };
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    // 迭代器完成
    resolve(value);
  } else {
    // -- 这行代码就是精髓 --
    // 将所有值promise化
    // 比如 yield 1
    // const a = Promise.resolve(1) a 是一个 promise
    // const b = Promise.resolve(a) b 是一个 promise
    // 可以做到统一 promise 输出
    // 当 promise 执行完之后再执行下一步
    // 递归调用 next 函数，直到 done == true
    Promise.resolve(value).then(_next, _throw);
  }
}
```
**await **每次遇到await都会中断此次进程，然后去执行外面的同步代码，然后再进来，根据上次保存的next值，继续执行
```js
async function foo() {
  await console.log(121212)
  console.log(121212)
}
```
```js
function _foo() {
    _foo = _asyncToGenerator(
        regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return console.log(121212);
                        case 2:
                             console.log(121212);
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee);
        }));
    return _foo.apply(this, arguments);
}
```
### 捕获错误
```js
(async () => {
 try {
  const data = await fn()
 } catch(err) {
  console.log('err is ->', err)
 }
})()
```

**利用promise**
```js
(async () => {
 const [err, data] = await fn().then(data => [null, data] ).catch(err => [err, null])
})()

// 抽离成公共方法
const awaitWrap = (promise) => {
  return promise
   .then(data => [null, data])
   .catch(err => [err, null])
}
const [err, data] = await awaitWrap(fn())
```

### async函数Generator函数的区别
1. 内置执行器。
Generator 函数的执行必须靠执行器，而async函数自带执行器。也就是说，async函数的执行，与普通函数一模一样，只要一行。如果你是从上面顺着看下来的，这里的执行器就是Generator和Iterator的yield和next机制，不用怀疑！

2. 更好的语义。
async和await，比起星号和yield，语义更清楚了。async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。

3. 正常情况下，await命令后面是一个 Promise 对象。如果不是，会被转成一个立即resolve的 Promise 对象。

4. 返回值是 Promise。
async函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用then方法指定下一步的操作。


