# String 方法

[[TOC]]

## 常用方法

### substring()

返回被截取的字符串，不改变原来的，传入参数是`起始位置和结束位置`。(不包含结束位置)

```js
let str = "12345";
str.substring(1); //2345
```

### substr()

返回被截取的字符串，不改变原来的，，传入参数是`起始位置和要截取的长度`

```js
let str = "123456";
str.substr(0, 2); //12
```

### slice()
**不改变字符串**
```js
var a = "abcdefg";
a.slice(1, -1); //"bcdef"  相当于 a.slice(1, a.length-1 )   有负值统一用length减去当前的负值来截取
a.substring(1, -1); //a    相当于 a.substring(0,1) 参数最小为0，小于0自动默认为0，参数小的为第一个参数
```

### includes()

- includes(), startsWith(), endsWith()
  - includes()：返回布尔值，表示是否找到了参数字符串。
  - startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
  - endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。

```js
let s = "Hello world!";

s.startsWith("Hello"); // true
s.endsWith("!"); // true
s.includes("o"); // true
```

### charAt()
charAt() 方法可返回指定位置的字符
```js
"日一二三四五六".charAt(1)
// -> 日
```

## Es6新方法
### padStart()
字符串补全长度  第一个参数用来指定字符串的最小长度，第二个参数是用来补全的字符串。 
+ padStart() 用于头部补全
+ padEnd()用于尾部补全
```js
//必须是字符串
'abc'.padStart(10, '0123456789')  //"0123456abc"
```

### trim()
`trim()`是两边的空格 `trimStart()`消除字符串头部的空格，`trimEnd()`消除尾部的空格
```js
const s = '  abc  ';

s.trim() // "abc"
s.trimStart() // "abc  "
s.trimEnd() // "  abc"
```

### repeat()
`repeat(n)`方法返回一个新字符串，表示将原字符串重复n次。
```js
'x'.repeat(3) // "xxx"
'na'.repeat(2.9) // "nana"
'na'.repeat(Infinity)// RangeError
'na'.repeat(-0.9) // ""
'na'.repeat(NaN) // ""
'na'.repeat('3') // "nanana"
```

### includes()
+ includes()：返回布尔值，表示是否找到了参数字符串。
+ startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
+ endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。
```js
let s = 'Hello world!';

s.startsWith('Hello') // true
s.endsWith('!') // true
s.includes('o') // true
```

## 参考文档
[MDN STRING](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)

