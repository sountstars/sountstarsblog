# JS设计模式探索

[[TOC]]

## 单例模式
```js
var singleton = {
 name: 'hzf',
 age: 24,
 walk: function(){
     console.log(this.age); //24
 },
 eat: function(){
     //todo
 }
}
```
+ 不足之处:
  - 没有什么封装性，所有的属性方法都是暴露的。
  - 全局变量很容易造成命名空间污染。
  - 对象一开始变创建，万一我们用不上就浪费了。
  
```js
var person = function(){
     // 这里声明私有变量和方法；
     const privateVariable = '私有的外面获取不到';
     
     function showPrivate(){
         console.log(privateVariable);
     }
     
     //公有的变量和方法(可以访问私有变量和方法);
     return {
         publicMethod: function(){
             showPrivate();
         },
         publicVar: '共有的外面能直接获取'
     }
}
const  single = person();

single.publicMethod(); // '私有的外面获取不到'
console.log(single.publicVar); // '共有的外面能直接获取'
```