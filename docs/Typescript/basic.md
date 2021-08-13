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
```ts
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
```ts
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
```ts
let x: [string, number];
x = ['hello', 10]; // OK
x = [10, 'hello']; // Error
```

`越界的元素`
在 2.6 及之前版本中，超出规定个数的元素称作越界元素，但是只要越界元素的类型是定义的类型中的一种即可。 比如我们定义的类型有两种：string 和 number，越界的元素是 string 类型，属于联合类型， 所以没问题，联合类型的概念我们后面会讲到。string | number
```ts
x[3] = 'world'; // OK, 字符串可以赋值给(string | number)类型
console.log(x[5].toString()); // OK, 'string' 和 'number' 都有 toString
x[6] = true; // Error, 布尔不是(string | number)类型
```

在 2.6 之后的版本，去掉了这个越界元素是联合类型的子类型即可的条件，要求元组赋值必须类型和个数都对应。  
在 2.6 之后的版本，[string, number] 元组类型的声明效果上可以看作等同于下面的声明：
```ts
interface Tuple extends Array<number | string> {0: string; 1: number; length: 2;}
```
如果元素个数超过 2 个时，它的 length 就不是 2 是大于 2 的数了，就不满足这个接口定义了，所以就会报错  
**如果你想要和 2.6 及之前版本一样的元组特性，那你可以这样定义接口：**  
```ts
interface Tuple extends Array<number | string> {0: string; 1: number;}
```

## 枚举
`枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。`  
**普通枚举**  
```js
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};

//枚举成员会被赋值为从 0 开始递增的数字，同时也会对枚举值到枚举名进行反向映射：

console.log(Days["Sun"] === 0); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
console.log(Days["Sat"] === 6); // true

console.log(Days[0] === "Sun"); // true
console.log(Days[1] === "Mon"); // true
console.log(Days[2] === "Tue"); // true
console.log(Days[6] === "Sat"); // true
```

**常数枚举**  
`常数枚举是使用 const enum 定义的枚举类型：`
```ts
const enum Directions {
    Up,
    Down,
    Left,
    Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
//常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员(赋值)。
//上例的编译结果是：
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
```

## 泛型

## 类型推论
`如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型。`
以下代码虽然没有指定类型，但是会在编译的时候报错：
```ts
let myFavoriteNumber = 'seven';
myFavoriteNumber = 7;

// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
```
事实上，它等价于：

```ts
let myFavoriteNumber: string = 'seven';
myFavoriteNumber = 7;

// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
```
```ts
//如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查：
let myFavoriteNumber;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```

## 联合类型
`联合类型（Union Types）表示取值可以为多种类型中的一种。`  
```ts
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
console.log(myFavoriteNumber.length); // 5
myFavoriteNumber = 7;
console.log(myFavoriteNumber.length); // 编译时报错,number么有length

// index.ts(5,30): error TS2339: Property 'length' does not exist on type 'number'.
```

## 类型断言
```ts
//类型断言有两种形式。 其一是“尖括号”语法：
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
//另一个为as语法：
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
//两种形式是等价的。 至于使用哪个大多数情况下是凭个人喜好；然而，当你在TypeScript里使用JSX时，只有as语法断言是被允许的。
```








