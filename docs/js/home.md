# 基本汇总 

[[TOC]]

## 节流防抖

```js
/**
 * 找到并返回应项的索引
 * @param list list
 * @param music 查找对象
 */
export const findIndex = (list, music) => {
  return list.findIndex((item) => {
    return item.id === music.id
  })
};
// 防抖函数
export const debounce = function (func, delay) {
  let timer;
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
};

// 节流函数
export const throttle = function (func, delay) {
  let now = Date.now();
  return function (...args) {
    const current = Date.now();
    if (current - now >= delay) {
      func.apply(this, args);
      now = current
    }
  }
};
```

## 构造函数
+  立刻在堆内存中创建一个新的对象
+  将新建的对象设置为函数中的this
+  逐个执行函数中的代码
+  将新建的对象作为返回值
```js
function Log(name, desc) {
    this.name = name;
    this.desc = desc;
}
let to4 = new Log('Sunsin', '今天注意啥4');
//{name: "Sunsin", desc: "今天注意啥1"}
```

## 导出表格

```js
const url = window.URL.createObjectURL(
  new Blob([res], { type: "application/vnd.ms-excel" })
);
const fileName = `操作日志${dayjs().format("YYYY-MM-DD")}.xls`;
let link = document.createElement("a");
link.style.display = "none";
link.href = url;
link.setAttribute("download", fileName);

document.body.appendChild(link);
link.click();
//释放URL对象所占资源
window.URL.revokeObjectURL(url);
//用完即删
document.body.removeChild(link);
```

## Es6模块导入

```
import * as xxx from ‘xxx’:  // 会将若干export导出的内容组合成一个对象返回；
import {a,b,c,...} from ‘xxx’

import xxx from ‘xxx’：（export default xxx）// 只会导出这个默认的对象作为一个对象

export {default as docs} from "./xxx"  // 可以作为入口 统一导出
```

## userAgent

```js
// 判断浏览器内核、手机系统等，使用 browser.userAgent.mobile
var browser = {
    userAgent: function () {
        var ua = navigator.userAgent;
        var ualower = navigator.userAgent.toLocaleLowerCase();
        return {
            trident: ua.indexOf('Trident') > -1, // IE内核
            presto: ua.indexOf('Presto') > -1, // opera内核
            webKit: ua.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') == -1, // 火狐内核
            mobile: !!ua.match(/AppleWebKit.*Mobile.*/) || !!ua.match(/AppleWebKit/), // 是否为移动终端
            ios: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // IOS终端
            android: ua.indexOf('Android') > -1, // 安卓终端
            iPhone: ua.indexOf('iPhone') > -1, // 是否为iphone或QQHD浏览器
            iPad: ua.indexOf('iPad') > -1, // 是否为iPad
            webApp: ua.indexOf('Safari') == -1, // 是否web应用程序，没有头部与底部
            QQbrw: ua.indexOf('MQQBrowser') > -1, // QQ浏览器(手机上的)
            weiXin: ua.indexOf('MicroMessenger') > -1, // 微信
            QQ: ualower.match(/\sQQ/i) == " qq", // QQ App内置浏览器（需要配合使用）
            weiBo: ualower.match(/WeiBo/i) == "weibo", // 微博
            ucLowEnd: ua.indexOf('UCWEB7.') > -1, //
            ucSpecial: ua.indexOf('rv:1.2.3.4') > -1,
            webview: !(ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/)) && ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
            ucweb: function () {
                try {
                    return parseFloat(ua.match(/ucweb\d+\.\d+/gi).toString().match(/\d+\.\d+/).toString()) >= 8.2
                } catch (e) {
                    if (ua.indexOf('UC') > -1) {
                        return true;
                    }
                    return false;
                }
            }(),
            Symbian: ua.indexOf('Symbian') > -1,
            ucSB: ua.indexOf('Firofox/1.') > -1
        };
    }()
};
```

## 检测数据类型
### typeof
```js
typeof用以获取一个变量或者表达式的类型，typeof一般只能返回如下几个结果：
number,boolean,string,function（函数）,symbol,object（NULL,数组，对象）,undefined。
```
### instanceof
```js
[1, 2, 3] instanceof Array; //true
//可以看到[1, 2, 3]是类型Array的实例
[1, 2, 3] instanceof Object; //true

//封装
function myInstanceof(val, type) { 
    let rightProto = type.prototype; // 取右边 prototype的值
    let leftPrevProto = val.__proto__; // 取左边__proto__值
    while (true) {
        if (leftPrevProto === null) { //如果左边的__proto__值为null，返回false
            return false;   
        }
        if (leftPrevProto === rightProto) { 
            return true;    
        } 
        leftPrevProto = leftPrevProto.__proto__ ; //以上都不满足，取上一层原型继续循环，直到没取到为null
    }
}
```
### constructor
1：null 和 undefined 无constructor，这种方法判断不了。

2：还有，如果自定义对象，开发者重写prototype之后，原有的constructor会丢失，因此，为了规范开发，在重写对象原型时一般都需要重新给 constructor 赋值，以保证对象实例的类型不被篡改。
```js
''.constructor===String
new Number(111).constructor===Number
(11).constructor===Number
false.constructor===Boolean
new Date().constructor===Date
new Function().constructor===Function
[].constructor===Array

class Chameleon {
  constructor({ newColor = "green" } = {}) {
    this.newColor = newColor;
  }
}
Chameleon.constructor===Function
new Chameleon().constructor.constructor===Function
Object.prototype.toString.call(new Chameleon().constructor) //"[object Function]"
new Chameleon().constructor===Function  //false
```
### Object.prototype.toString.call()
```js
function is(type, obj) {
    var clas = Object.prototype.toString.call(Object(obj)).slice(8, -1);   //Object(null)
    return obj !== undefined && obj !== null && clas === type;
}

is('String', 'test'); // true
is('String', new String('test')); // true
```

## this 指向
```js
//全局作用域或者普通函数中this指向全局对象window
//方法调用中谁调用this指向谁
//构造函数中this指向构造函数的实例
//注意定时器里面的this指向window
```
call
```js
Function.prototype.mycall = function(context) {
	var context = context || window;
	context.fn = this;  	// 给context添加一个属性
	var args = [...arguments].slice(1);	// 获取参数
	var result = context.fn(...args); 	// 执行该函数
	delete context.fn; 	// 删除fn	
	return result;	// 返回执行结果
}
```
apply
```js
Function.prototype.myapply = function(context) {
	var context = context || window;
	context.fn = this;
	var result = null;
	if(arguments[1]) {
		result = context.fn(...arguments);
	}else {
		result = context.fn();
	}
	delete context.fn;
	return result;
}
```
bind
```js
Function.prototype.mybind = function(context) {
	if(typeof this !== 'function') {
		throw new TypeError('Error');
	}
	var _this = this;
	var args = [...arguments].slice(1);
	return function F() {
		if(this instanceof F) {
			return new _this(...args, ...arguments);
		}
		return _this.apply(context, args.concat(...arguments));
	}
}
```

