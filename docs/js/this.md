# this指向

[[TOC]]



## 全局
```js
非严格模式和严格模式中this都是指向顶层对象（浏览器中是window）
this === window // true



window:
    1.直接在全局输出this
    2.函数打印this,并且直接调用
    3.定时器中普通函数this为window
    4.匿名函数自执行
事件中的this:
    哪个对象触发，this就是那个对象
实例:
    new 构造函数 -> this就是实例
箭头函数:
    this就走定义箭头函数的域
    箭头函数不能new，一new就报错
    箭头函数也没有arguments
对象中的this
    let obj = {fn:function(){console.log(this)}}
```


