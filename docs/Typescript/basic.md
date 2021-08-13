# Typescript

[[TOC]] 

## TypeScript  
TypeScript 是 Microsoft 开发和维护的一种面向对象的编程语言。它是 JavaScript 的超集，包含了 JavaScript 的所有元素，可以载入 JavaScript 代码运行，并扩展了 JavaScript 的语法。

+ TypeScript 具有以下特点：
    - TypeScript 是 Microsoft 推出的开源语言，使用 Apache 授权协议
    - TypeScript 增加了**静态类型、类、模块、接口和类型注解**
    - TypeScript 可用于开发大型的应用
    - TypeScript 易学易于理解

+ TypeScript 的优势：
    - 静态输入 开发环境下自动检查类型错误，以便写好更健壮的代码并对其进行维护，使得代码质量更好、更清晰
    - 大型的开发项目 使用TypeScript工具来进行重构更变的容易、快捷。（有时为了改进开发项目，需要对代码库进行小的增量更改。这些小小的变化可能会产生严重的、意想不到的后果，因此有必要撤销这些变化）
    - 更好的协作

## 基本数据类型
```js
//Boolean
let isDone: boolean = false;  
//Number
let decLiteral: number = 6;
//String
let myName: string = 'LLL';
//Any  任意值（Any）用来表示允许赋值为任意类型。
let myFavoriteNumber: any = 'seven';
myFavoriteNumber = 7;
//Void 空值 
//ypeScript 中，可以用 void 表示没有任何返回值的函数：
function alertName(): void {
    alert('My name is Tom');
}
//能将它赋值为 undefined 和 null：
let unusable: void = undefined;
let unusable: void = null;
```  

`Null 和 Undefined`
```js
let u: undefined = undefined;
let n: null = null;
//与 void 的区别是，undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 number 类型的变量：
// 这样不会报错
let num: number = undefined;
//而 void 类型的变量不能赋值给 number 类型的变量：
let u: void;
let num: number = u;

// index.ts(2,5): error TS2322: Type 'void' is not assignable to type 'number'.
```

## 元组
`数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象`
```js
let x: [string, number];
x = ['hello', 10]; // OK
x = [10, 'hello']; // Error
```




