# String方法 

[[TOC]]


## substring()
+ 返回被截取的字符串，不改变原来的，传入参数是起始位置和结束位置。(不包含结束位置)
```js
let str='12345';
str.substring(1)//2345
```

## slice()
+  跟 substring()用户相同
+  当为负值的时候不同，还是看例子吧
```js
var a =  'abcdefg' 
a.slice(1,-1) //"bcdef"  相当于 a.slice(1, a.length-1 )   有负值统一用length减去当前的负值来截取
a.substring(1,-1) //a    相当于 a.substring(0,1) 参数最小为0，小于0自动默认为0，参数小的为第一个参数
```

## includes()
+  includes(), startsWith(), endsWith()
    +    includes()：返回布尔值，表示是否找到了参数字符串。
    +    startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
    +    endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。
```js
let s = 'Hello world!';

s.startsWith('Hello') // true
s.endsWith('!') // true
s.includes('o') // true
```