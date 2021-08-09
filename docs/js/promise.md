# Promise && async

[[TOC]]

### 实现一个简单的Promise
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

### async await
 + Generator 函数的语法糖
 + async函数就是将 Generator 函数的星号（*）替换成async，将yield替换成await
```js
```

