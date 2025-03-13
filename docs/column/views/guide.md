# 主页
#### 1.bind\apply\bind

1. 都是用于改变函数内部 this 指向的方法

   call   立即执行   参数逐个传递（arg1, arg2）  继承、借用对象方法

   apply  立即执行   参数数组（[arg1, arg2]）  计算数组最大值（Math.max）

   bind   延迟执行   返回函数，可分批传参  定时器、事件回调绑定 this

#### 

## 1 数据类型基础

### [#](https://interview.poetries.top/docs/excellent-docs/3-JS模块.html#_1-1-js内置类型)1.1 JS内置类型

- `JS` 中分为七种内置类型，七种内置类型又分为两大类型：基本类型和对象（`Object`）。
- 基本类型有七种： `null`，`undefined`，`boolean`，`number`，`string`，`symbol`, `bigint`
  - `BigInt` 是 `ES10` 新增的数据类型
  - `Symbol` 代表独一无二的值，最大的用法是用来定义对象的唯一属性名。
  - `BigInt` 可以表示任意大小的整数。

- 其中 `JS` 的数字类型是浮点类型的，没有整型。并且浮点类型基于 `IEEE 754`标准实现，在使用中会遇到某些 Bug。`NaN` 也属于 `number` 类型，并且 `NaN` 不等于自身。

**引用数据类型:**

- 对象`Object`（包含普通对象-`Object`，数组对象-`Array`，正则对象-`RegExp`，日期对象-`Date`，数学函数-`Math`，函数对象-`Function`）

```js
let a = 111 // 这只是字面量，不是 number 类型
a.toString() // 使用时候才会转换为对象类型
```

### 1.2 null和undefined区别

> `Undefined`类型只有一个值，即`undefined`。当声明的变量还未被初始化时，变量的默认值为`undefined`。用法:

- 变量被声明了，但没有赋值时，就等于`undefined`。
- 调用函数时，应该提供的参数没有提供，该参数等于`undefined`。
- 对象没有赋值的属性，该属性的值为`undefined`。
- 函数没有返回值时，默认返回`undefined`

> `Null`类型也只有一个值，即`null`。`null`用来表示尚未存在的对象，常用来表示函数企图返回一个不存在的对象。用法:

- 作为函数的参数，表示该函数的参数不是对象。
- 作为对象原型链的终点

### [#](https://interview.poetries.top/docs/excellent-docs/3-JS模块.html#_1-3-null是对象吗-为什么)1.3 null是对象吗？为什么？

结论: `null`不是对象。

> 解释: 虽然 `typeof null` 会输出 object，但是这只是 JS 存在的一个悠久 Bug。在 JS 的最初版本中使用的是 32 位系统，为了性能考虑使用低位存储变量的类型信息，000 开头代表是对象然而 null 表示为全零，所以将它错误的判断为 object 。

### [#](https://interview.poetries.top/docs/excellent-docs/3-JS模块.html#_1-4-1-tostring-为什么可以调用)1.4 '1'.toString()为什么可以调用？

其实在这个语句运行的过程中做了这样几件事情：

```text
var s = new Object('1');
s.toString();
s = null;

```

### 2.4 数据类型检测

- ```
  typeof  typeof {} → 'Object'
  ```

  - 直接在计算机底层基于数据类型的值（二进制）进行检测
  - `typeof NaN === 'number'`
  - **无法区分对象类型**：数组、对象、null均返回"object"
  - **不识别自定义对象**：所有自定义类实例返回"object"

- ```
  instanceof  [] instanceof Array → true
  ```

  - 检测当前实例是否属于这个类的
  - 底层机制：只要当前类出现在实例的原型上，结果都是true
  - 无法检测基本类型；原型链污染风险

- ```
  constructor
  ```

  - 支持基本类型
  - 可被篡改；null/undefined报错

- ```
  Object.prototype.toString.call([val])
  ```

  - 返回当前实例所属类信息

> 判断 `Target` 的类型，单单用 `typeof` 并无法完全满足，这其实并不是 `bug`，本质原因是 `JS` 的万物皆对象的理论。因此要真正完美判断时，我们需要区分对待:

- 基本类型(`null`): 使用 `String(null)`
- 基本类型(`string / number / boolean / undefined`) + `function`: - 直接使用 `typeof`即可
- 其余引用类型(`Array / Date / RegExp Error`): 调用`toString`后根据`[object XXX]`进行判断

## 4 闭包

> 红宝书(p178)上对于闭包的定义：闭包是指有权访问另外一个函数作用域中的变量的函数，

> MDN 对闭包的定义为：闭包是指那些能够访问自由变量的函数。
>
> - （其中自由变量，指在函数中使用的，但既不是函数参数arguments也不是函数的局部变量的变量，其实就是另外一个函数作用域中的变量。）

### [#](https://interview.poetries.top/docs/excellent-docs/3-JS模块.html#_4-1-闭包产生的原因)4.1 闭包产生的原因

> 首先要明白作用域链的概念，其实很简单，在ES5中只存在两种作用域————`全局作用域`和`函数作用域`，当访问一个变量时，解释器会首先在当前作用域查找标示符，如果没有找到，就去父作用域找，直到找到该变量的标示符或者不在父作用域中，这就是作用域链，值得注意的是，每一个子函数都会拷贝上级的作用域，形成一个作用域的链条。

**闭包产生的本质就是，当前环境中存在指向父级作用域的引用。还是举上面的例子:**

```js
function f1() {
  var a = 2
  function f2() {
    console.log(a);//2
  }
  return f2;
}
var x = f1();
x();
    
```

> 这里x会拿到父级作用域中的变量，输出2。因为在当前环境中，含有对f2的引用，f2恰恰引用了window、f1和f2的作用域。因此f2可以访问到f1的作用域的变量。

## 5 原型和原型链链

- 原型(`prototype`): 一个简单的对象，用于实现对象的 属性继承。可以简单的理解成对象的爹。在 `Firefox` 和 `Chrome` 中，每个`JavaScript`对象中都包含一个`__proto__`(非标准)的属性指向它爹(该对象的原型)，可`obj.__proto__`进行访问。
- 构造函数: 可以通过`new`来 新建一个对象 的函数。
- 实例: 通过构造函数和`new`创建出来的对象，便是实例。 实例通过`__proto__`指向原型，通过`constructor`指向构造函数。

> 以`Object`为例，我们常用的`Object`便是一个构造函数，因此我们可以通过它构建实例。

```js
// 实例
const instance = new Object()
 
    
```

> 则此时， 实例为`instance`, 构造函数为`Object`，我们知道，构造函数拥有一个`prototype`的属性指向原型，因此原型为:

```js
// 原型
const prototype = Object.prototype
 
    
```

**这里我们可以来看出三者的关系:**

- `实例.__proto__ === 原型`
- `原型.constructor === 构造函数`
- `构造函数.prototype === 原型`

```text
// 这条线其实是是基于原型进行获取的，可以理解成一条基于原型的映射线
// 例如: 
// const o = new Object()
// o.constructor === Object   --> true
// o.__proto__ = null;
// o.constructor === Object   --> false
实例.constructor === 构造函数
 
```

### 5.2 原型对象和构造函数有何关系

- 在JavaScript中，每当定义一个函数数据类型(普通函数、类)时候，都会天生自带一个`prototype`属性，这个属性指向函数的原型对象。
- 当函数经过`new`调用时，这个函数就成为了构造函数，返回一个全新的实例对象，这个实例对象有一个`__proto__`属性，指向构造函数的原型对象。

### 5.3 能不能描述一下原型链

> JavaScript对象通过`__proto__` 指向父类对象，直到指向`Object`对象为止，这样就形成了一个原型指向的链条, 即原型链

![img](https://s.poetries.top/images/20210309102100.png)

- 对象的 `hasOwnProperty()` 来检查对象自身中是否含有该属性
- 使用 `in` 检查对象中是否含有某个属性时，如果对象中没有但是原型链中有，也会返回 `true`

## 6 继承



### 6.1方式4: 组合继承的优化1

```js
  function Parent4 () {
    this.name = 'parent4';
    this.play = [1, 2, 3];
  }
  function Child4() {
    Parent4.call(this);
    this.type = 'child4';
  }
  Child4.prototype = Parent4.prototype;
 
```

这里让将父类原型对象直接给到子类，父类构造函数只执行一次，而且父类属性和方法均能访问，但是我们来测试一下：

```js
var s3 = new Child4();
var s4 = new Child4();
console.log(s3)
 

    
```

![img](https://s.poetries.top/images/20210309103358.png)

> 子类实例的构造函数是Parent4，显然这是不对的，应该是Child4。

### [#](https://interview.poetries.top/docs/excellent-docs/3-JS模块.html#_6-5-方式5-最推荐使用-组合继承的优化2)6.2 方式5(最推荐使用): 组合继承的优化2

```js
 function Parent5 () {
    this.name = 'parent5';
    this.play = [1, 2, 3];
  }
  function Child5() {
    Parent5.call(this);
    this.type = 'child5';
  }
  Child5.prototype = Object.create(Parent5.prototype);
  Child5.prototype.constructor = Child5;

```

这是最推荐的一种方式，接近完美的继承，它的名字也叫做**寄生组合**继承。

### 6.3 从设计思想上谈谈继承本身的问题

> 继承的最大问题在于：无法决定继承哪些属性，所有属性都得继承。

**那如何来解决继承的诸多问题呢？**

> 用组合，这也是当今编程语法发展的趋势，比如golang完全采用的是面向组合的设计方式。

顾名思义，面向组合就是先设计一系列零件，然后将这些零件进行拼装，来形成不同的实例或者类。

```js
function drive(){
  console.log("wuwuwu!");
}
function music(){
  console.log("lalala!")
}
function addOil(){
  console.log("哦哟！")
}

let car = compose(drive, music, addOil);
let newEnergyCar = compose(drive, music);
 

    
```

> 代码干净，复用性也很好。这就是面向组合的设计方式。

### 6.4 继承-简版

> 在 ES5 中，我们可以使用如下方式解决继承的问题

```js
function Super() {}
Super.prototype.getNumber = function() {
  return 1
}

function Sub() {}
let s = new Sub()
Sub.prototype = Object.create(Super.prototype, {
  constructor: {
    value: Sub,
    enumerable: false,
    writable: true,
    configurable: true
  }
})
 

    
```

- 以上继承实现思路就是将子类的原型设置为父类的原型
- 在 `ES6` 中，我们可以通过 `class` 语法轻松解决这个问题

```js
class MyDate extends Date {
  test() {
    return this.getTime()
  }
}
let myDate = new MyDate()
myDate.test()
 

    
```

- 但是 `ES6` 不是所有浏览器都兼容，所以我们需要使用 `Babel` 来编译这段代码。

## 7 this 

![image.png](https://s.poetries.top/gitee/2020/07/2.png)

**总结**

> `this`执行主体，谁把它执行的和在哪创建的在哪执行的都没有必然的关系

- 函数执行，看方法前面是否有点，没有点`this`是`window`(严格模式下是`undefined`)，有点，点前面是谁·this·就是谁
- 给当前元素的某个事件行为绑定方法，当事件行为触发，方法中的this是当前元素本身（排除`attachEvent`）
- 构造函数体中`this`是当前类的实例
- 箭头函数中没有执行主体，所用到的this都是所处上下文中的`this`
- 可以基于`Function.prototype`上的`call/apply/bind`改变`this`指向

## 8 内存机制

**具体而言，以下数据类型存储在栈中:**

- `boolean`
- `null`
- `undefined`
- `number`
- `string`
- `symbol`
- `bigint`

**而所有的对象数据类型存放在堆中**。

> 值得注意的是，对于赋值操作，原始类型的数据直接完整地复制变量值，对象数据类型的数据则是复制引用地址。

因此会有下面的情况:

```js
let obj = { a: 1 };
let newObj = obj;
newObj.a = 2;
console.log(obj.a);//变成了2
```

- 之所以会这样，是因为 `obj` 和 `newObj` 是同一份堆空间的地址，改变`newObj`，等于改变了共同的堆内存，这时候通过 obj 来获取这块内存的值当然会改变。 当然，你可能会问: 为什么不全部用栈来保存呢？
- 首先，对于系统栈来说，它的功能除了保存变量之外，还有创建并切换函数执行上下文的功能。

##  9 执行上下文

**小结**

> 执行上下文可以简单理解为一个对象:

**它包含三个部分:**

- 变量对象(`VO`)
- 作用域链(词法作用域)
- `this`指向

**它的类型:**

- 全局执行上下文
- 函数执行上下文
- `eval`执行上下文

**代码执行过程:**

- 创建 全局上下文 (`global EC`)
- 全局执行上下文 (`caller`) 逐行 自上而下 执行。遇到函数时，函数执行上下文 (`callee`) 被`push`到执行栈顶层
- 函数执行上下文被激活，成为 `active EC`, 开始执行函数中的代码，`caller` 被挂起
- 函数执行完后，`callee` 被`pop`移除出执行栈，控制权交还全局上下文 (`caller`)，继续执行

## 10 内存泄露

### 10.2 内存泄漏的场景

- 闭包使用不当引起内存泄漏
- 全局变量
- 分离的`DOM`节点
- 控制台的打印
- 遗忘的定时器

**1. 闭包使用不当引起内存泄漏**

使用`Performance`和`Memory`来查看一下闭包导致的内存泄漏问题

**2. 全局变量**

全局的变量一般是不会被垃圾回收掉的当然这并不是说变量都不能存在全局，只是有时候会因为疏忽而导致某些变量流失到全局，例如未声明变量，却直接对某变量进行赋值，就会导致该变量在全局创建

- 此时这种情况就会在全局自动创建一个变量`name`，并将一个很大的数组赋值给`name`，又因为是全局变量，所以该内存空间就一直不会被释放
- 解决办法的话，自己平时要多加注意，不要在变量未声明前赋值，或者也可以`开启严格模式`，这样就会在不知情犯错时，收到报错警告

**3. 分离的`DOM`节点**

假设你手动移除了某个`dom`节点，本应释放该dom节点所占用的内存，但却因为疏忽导致某处代码仍对该被移除节点有引用，最终导致该节点所占内存无法被释放

**4. 控制台的打印**

**5. 遗忘的定时器**

## 11 垃圾回收机制

- 对于在JavaScript中的字符串，对象，数组是没有固定大小的，只有当对他们进行动态分配存储时，解释器就会分配内存来存储这些数据，当JavaScript的解释器消耗完系统中所有可用的内存时，就会造成系统崩溃。
- 内存泄漏，在某些情况下，不再使用到的变量所占用内存没有及时释放，导致程序运行中，内存越占越大，极端情况下可以导致系统崩溃，服务器宕机。
- JavaScript有自己的一套垃圾回收机制，JavaScript的解释器可以检测到什么时候程序不再使用这个对象了（数据），就会把它所占用的内存释放掉。
- 针对JavaScript的垃圾回收机制有以下两种方法（常用）：**标记清除（现代），引用计数（之前）**

**有两种垃圾回收策略：**

- **标记清除**：标记阶段即为所有活动对象做上标记，清除阶段则把没有标记（也就是非活动对象）销毁。
- **引用计数**：它把对象是否不再需要简化定义为对象有没有其他对象引用到它。如果没有引用指向该对象（引用计数为 `0`），对象将被垃圾回收机制回收

**标记清除的缺点：**

- **内存碎片化**，空闲内存块是不连续的，容易出现很多空闲内存块，还可能会出现分配所需内存过大的对象时找不到合适的块。
- **分配速度慢**，因为即便是使用 First-fit 策略，其操作仍是一个 `O(n)` 的操作，最坏情况是每次都要遍历到最后，同时因为碎片化，大对象的分配效率会更慢。

> 解决以上的缺点可以使用 **标记整理（Mark-Compact）算法** 标记结束后，标记整理算法会将活着的对象（即不需要清理的对象）向内存的一端移动，最后清理掉边界的内存（如下图）

![img](https://s.poetries.top/uploads/2022/08/9ab816979f615b6e.png)

**引用计数的缺点：**

- 需要一个计数器，所占内存空间大，因为我们也不知道被引用数量的上限。
- 解决不了循环引用导致的无法回收问题

> V8 的垃圾回收机制也是基于标记清除算法，不过对其做了一些优化。

- 针对新生区采用并行回收。
- 针对老生区采用增量标记与惰性回收

## 12 深拷贝 浅拷贝

**1. 浅拷贝的原理和实现**

> 自己创建一个新的对象，来接受你要重新复制或引用的对象值。如果对象属性是基本的数据类型，复制的就是基本类型的值给新对象；但如果属性是引用数据类型，复制的就是内存中的地址，如果其中一个对象改变了这个内存中的地址，肯定会影响到另一个对象

**方法一：object.assign**

> `object.assign`是 ES6 中 `object` 的一个方法，该方法可以用于 JS 对象的合并等多个用途，`其中一个用途就是可以进行浅拷贝`。该方法的第一个参数是拷贝的目标对象，后面的参数是拷贝的来源对象（也可以是多个来源）。

```text
object.assign 的语法为：Object.assign(target, ...sources)
 
```

**但是使用 object.assign 方法有几点需要注意**

- 它不会拷贝对象的继承属性；
- 它不会拷贝对象的不可枚举的属性；
- 可以拷贝 `Symbol` 类型的属性。

**方法二：扩展运算符方式**

- 我们也可以利用 JS 的扩展运算符，在构造对象的同时完成浅拷贝的功能。
- 扩展运算符的语法为：`let cloneObj = { ...obj };`

> 扩展运算符 和 `object.assign` 有同样的缺陷，也就是`实现的浅拷贝的功能差不多`，但是如果属性都是`基本类型的值，使用扩展运算符进行浅拷贝会更加方便`

**方法三：concat 拷贝数组**

> 数组的 `concat` 方法其实也是浅拷贝，所以连接一个含有引用类型的数组时，需要注意修改原数组中的元素的属性，因为它会影响拷贝之后连接的数组。不过 `concat` 只能用于数组的浅拷贝，使用场景比较局限。

**方法四：slice 拷贝数组**

> `slice` 方法也比较有局限性，因为`它仅仅针对数组类型`。`slice方法会返回一个新的数组对象`，这一对象由该方法的前两个参数来决定原数组截取的开始和结束时间，是不会影响和改变原始数组的。

**手工实现一个浅拷贝**

根据以上对浅拷贝的理解，如果让你自己实现一个浅拷贝，大致的思路分为两点：

- 对基础类型做一个最基本的一个拷贝；
- 对引用类型开辟一个新的存储，并且拷贝一层对象属性。

```js
const shallowClone = (target) => {
  if (typeof target === 'object' && target !== null) {
    const cloneTarget = Array.isArray(target) ? []: {};
    for (let prop in target) {
      if (target.hasOwnProperty(prop)) {
          cloneTarget[prop] = target[prop];
      }
    }
    return cloneTarget;
  } else {
    return target;
  }
}
 
```

**2. 深拷贝的原理和实现**

```js
最简单版：JSON.parse(JSON.stringify(a))
```

`浅拷贝只是创建了一个新的对象，复制了原有对象的基本类型的值，而引用数据类型只拷贝了一层属性，再深层的还是无法进行拷贝`。深拷贝则不同，对于复杂引用数据类型，其在堆内存中完全开辟了一块内存地址，并将原有的对象完全复制过来存放。

这两个对象是相互独立、不受影响的，彻底实现了内存上的分离。总的来说，`深拷贝的原理可以总结如下`：

> 将一个对象从内存中完整地拷贝出来一份给目标对象，并从堆内存中开辟一个全新的空间存放新对象，且新对象的修改并不会改变原对象，二者实现真正的分离。

- 针对能够遍历对象的不可枚举属性以及 `Symbol` 类型，我们可以使用 `Reflect.ownKeys` 方法；
- 当参数为 `Date、RegExp` 类型，则直接生成一个新的实例返回；
- 利用 `Object` 的 `getOwnPropertyDescriptors` 方法可以获得对象的所有属性，以及对应的特性，顺便结合 `Object.create` 方法创建一个新对象，并继承传入原对象的原型链；
- 利用 `WeakMap` 类型作为 `Hash` 表，因为 `WeakMap` 是弱引用类型，可以有效防止内存泄漏（你可以关注一下 `Map` 和 `weakMap` 的关键区别，这里要用 `weakMap`），作为检测循环引用很有帮助，如果存在循环，则引用直接返回 `WeakMap` 存储的值

如果你在考虑到循环引用的问题之后，还能用 `WeakMap` 来很好地解决，并且向面试官解释这样做的目的，那么你所展示的代码，以及你对问题思考的全面性，在面试官眼中应该算是合格的了

**实现深拷贝**

```js
const isComplexDataType = obj => (typeof obj === 'object' || typeof obj === 'function') && (obj !== null)

const deepClone = function (obj, hash = new WeakMap()) {
  if (obj.constructor === Date) {
    return new Date(obj)       // 日期对象直接返回一个新的日期对象
  }
  
  if (obj.constructor === RegExp){
    return new RegExp(obj)     //正则对象直接返回一个新的正则对象
  }
  
  //如果循环引用了就用 weakMap 来解决
  if (hash.has(obj)) {
    return hash.get(obj)
  }
  let allDesc = Object.getOwnPropertyDescriptors(obj)

  //遍历传入参数所有键的特性
  let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc)

  // 把cloneObj原型复制到obj上
  hash.set(obj, cloneObj)

  for (let key of Reflect.ownKeys(obj)) { 
    cloneObj[key] = (isComplexDataType(obj[key]) && typeof obj[key] !== 'function') ? deepClone(obj[key], hash) : obj[key]
  }
  return cloneObj
}
 
    
// 下面是验证代码
let obj = {
  num: 0,
  str: '',
  boolean: true,
  unf: undefined,
  nul: null,
  obj: { name: '我是一个对象', id: 1 },
  arr: [0, 1, 2],
  func: function () { console.log('我是一个函数') },
  date: new Date(0),
  reg: new RegExp('/我是一个正则/ig'),
  [Symbol('1')]: 1,
};
Object.defineProperty(obj, 'innumerable', {
  enumerable: false, value: '不可枚举属性' }
);
obj = Object.create(obj, Object.getOwnPropertyDescriptors(obj))
obj.loop = obj    // 设置loop成循环引用的属性
let cloneObj = deepClone(obj)
cloneObj.arr.push(4)
console.log('obj', obj)
console.log('cloneObj', cloneObj)
 
```

## 1 谈谈你对MVVM的理解

> `MVVM`是`Model-View-ViewModel`缩写，也就是把`MVC`中的`Controller`演变成`ViewModel`。`Model`层代表数据模型，`View`代表UI组件，`ViewModel`是`View`和`Model`层的桥梁，数据会绑定到`viewModel`层并自动将数据渲染到页面中，视图变化的时候会通知`viewModel`层更新数据。

- `Model`: 代表数据模型，也可以在`Model`中定义数据修改和操作的业务逻辑。我们可以把`Model`称为数据层，因为它仅仅关注数据本身，不关心任何行为
- `View`: 用户操作界面。当`ViewModel`对`Model`进行更新的时候，会通过数据绑定更新到`View`
- `ViewModel`： 业务逻辑层，`View`需要什么数据，`ViewModel`要提供这个数据；`View`有某些操作，`ViewModel`就要响应这些操作，所以可以说它是`Model for View`.

**总结**： `MVVM`模式简化了界面与业务的依赖，解决了数据频繁更新。`MVVM` 在使用当中，利用双向绑定技术，使得 `Model` 变化时，`ViewModel` 会自动更新，而 `ViewModel` 变化时，`View` 也会自动变化。

## 2 谈谈你对SPA单页面的理解

> `SPA`（ single-page application ）仅在 `Web` 页面初始化时加载相应的 `HTML`、`JavaScript` 和 `CSS`。一旦页面加载完成，`SPA` 不会因为用户的操作而进行页面的重新加载或跳转；取而代之的是利用路由机制实现 `HTML` 内容的变换，`UI` 与用户的交互，避免页面的重新加载

**优点：**

- 用户体验好、快，内容的改变不需要重新加载整个页面，避免了不必要的跳转和重复渲染；
- 基于上面一点，`SPA` 相对对服务器压力小；
- 前后端职责分离，架构清晰，前端进行交互逻辑，后端负责数据处理

**缺点：**

- 初次加载耗时多：为实现单页 `Web` 应用功能及显示效果，需要在加载页面的时候将 `JavaScript`、`CSS` 统一加载，部分页面按需加载；
- 前进后退路由管理：由于单页应用在一个页面中显示所有的内容，所以不能使用浏览器的前进后退功能，所有的页面切换需要自己建立堆栈管理；
- `SEO` 难度较大：由于所有的内容都在一个页面中动态替换显示，所以在 `SEO` 上其有着天然的弱势

**单页应用与多页应用的区别**

|                   | 单页面应用（SPA）         | 多页面应用（MPA）                         |
| ----------------- | ------------------------- | ----------------------------------------- |
| 组成              | 一个主页面和多个页面片段  | 多个主页面                                |
| 刷新方式          | 局部刷新                  | 整页刷新                                  |
| `url`模式         | 哈希模式                  | 历史模式                                  |
| `SEO`搜索引擎优化 | 难实现，可使用SSR方式改善 | 容易实现                                  |
| 数据传递          | 容易                      | 通过`url`、`cookie`、`localStorage`等传递 |
| 页面切换          | 速度快，用户体验良好      | 切换加载资源，速度慢，用户体验差          |
| 维护成本          | 相对容易                  | 相对复杂                                  |

**实现一个SPA**

- 监听地址栏中`hash`变化驱动界面变化
- 用`pushsate`记录浏览器的历史，驱动界面发送变化

![img](https://s.poetries.top/uploads/2022/09/e2b412462d9e1bbf.png)

### **hash 模式**：

核心通过监听`url`中的`hash`来进行路由跳转

#### **history模式**：

`history` 模式核心借用 `HTML5 history api`，`api` 提供了丰富的 `router` 相关属性先了解一个几个相关的api

- `history.pushState` 浏览器历史纪录添加记录
- `history.replaceState`修改浏览器历史纪录中当前纪录
- `history.popState` 当 `history` 发生变化时触发

### hash vs history

外观上(表面)
hash:带有#号,不美观。
history:没有#号,更美观一些。
实现原理(本质)
hash:通过动态锚点技术加window对象的onhashchange方法实现。
history:通过history对象的pushState实现。
应用场景
hash:hash模式的项目通过第三方app分享,其地址可能会被标记为不合法地址。
history:history模式的项目部署到服务器后直接刷新可能会报404,这需要后端通过重定向来解决此类问题。

## 3 Vue2.x 响应式数据原理

整体思路是**数据劫持+观察者模式**

对象内部通过 `defineReactive` 方法，使用 `Object.defineProperty` 来劫持各个属性的 `setter`、`getter`（只会劫持已经存在的属性），数组则是通过`重写数组7个方法`来实现。当页面使用对应属性时，每个属性都拥有自己的 `dep` 属性，存放他所依赖的 `watcher`（依赖收集），当属性变化后会通知自己对应的 `watcher` 去更新(派发更新)

**Object.defineProperty基本使用**

```js
function observer(value) { // proxy reflect
    if (typeof value === 'object' && typeof value !== null)
    for (let key in value) {
        defineReactive(value, key, value[key]);
    }
}

function defineReactive(obj, key, value) {
    observer(value);
    Object.defineProperty(obj, key, {
        get() { // 收集对应的key 在哪个方法（组件）中被使用
            return value;
        },
        set(newValue) {
            if (newValue !== value) {
                observer(newValue);
                value = newValue; // 让key对应的方法（组件重新渲染）重新执行
            }
        }
    })
}
let obj1 = { school: { name: 'poetry', age: 20 } };
observer(obj1);
console.log(obj1)
 

    
```

**源码分析**

![img](https://s.poetries.top/uploads/2022/08/c2f6869e2adcf668.png)

```js
class Observer {
  // 观测值
  constructor(value) {
    this.walk(value);
  }
  walk(data) {
    // 对象上的所有属性依次进行观测
    let keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let value = data[key];
      defineReactive(data, key, value);
    }
  }
}
// Object.defineProperty数据劫持核心 兼容性在ie9以及以上
function defineReactive(data, key, value) {
  observe(value); // 递归关键
  // --如果value还是一个对象会继续走一遍odefineReactive 层层遍历一直到value不是对象才停止
  //   思考？如果Vue数据嵌套层级过深 >>性能会受影响
  Object.defineProperty(data, key, {
    get() {
      console.log("获取值");

      //需要做依赖收集过程 这里代码没写出来
      return value;
    },
    set(newValue) {
      if (newValue === value) return;
      console.log("设置值");
      //需要做派发更新过程 这里代码没写出来
      value = newValue;
    },
  });
}
export function observe(value) {
  // 如果传过来的是对象或者数组 进行属性劫持
  if (
    Object.prototype.toString.call(value) === "[object Object]" ||
    Array.isArray(value)
  ) {
    return new Observer(value);
  }
}
 
    
```

说一说你对**vue响应式**理解回答范例

- 所谓数据响应式就是**能够使数据变化可以被检测并对这种变化做出响应的机制**
  - `MVVM`框架中要解决的一个核心问题是连接数据层和视图层，通过**数据驱动**应用，数据变化，视图更新，要做到这点的就需要对数据做响应式处理，这样一旦数据发生变化就可以立即做出更新处理
- 以`vue`为例说明，通过数据响应式加上虚拟`DOM`和`patch`算法，开发人员只需要操作数据，关心业务，完全不用接触繁琐的DOM操作，从而大大提升开发效率，降低开发难度
- `vue2`中的数据响应式会根据数据类型来做不同处理，如果是**对象则采用`Object.defineProperty()`的方式定义数据拦截，当数据被访问或发生变化时，我们感知并作出响应；如果是数组则通过覆盖数组对象原型的7个变更方法**，使这些方法可以额外的做更新通知，从而作出响应。这种机制很好的解决了数据响应化的问题，但在实际使用中也存在一些缺点：比如初始化时的递归遍历会造成性能损失；新增或删除属性时需要用户使用`Vue.set/delete`这样特殊的`api`才能生效；对于`es6`中新产生的`Map`、`Set`这些数据结构不支持等问题
- 为了解决这些问题，`vue3`重新编写了这一部分的实现：利用`ES6`的`Proxy`代理要响应化的数据，它有很多好处，编程体验是一致的，不需要使用特殊`api`，初始化性能和内存消耗都得到了大幅改善；另外由于响应化的实现代码抽取为独立的`reactivity`包，使得我们可以更灵活的使用它，第三方的扩展开发起来更加灵活了

## 4 Vue3.x 响应式数据原理

> `Vue3.x`改用`Proxy`替代`Object.defineProperty`。因为`Proxy`可以直接监听对象和数组的变化，并且有多达`13`种拦截方法。并且作为新标准将受到浏览器厂商重点持续的性能优化。

### proxy基本用法

```js
// proxy默认只会代理第一层对象，只有取值再次是对象的时候再次代理，不是一上来就代理，提高性能。不像vue2.x递归遍历每个对象属性
let handler = {
    set(target, key, value) {
        return Reflect.set(target, key, value);
    },
    get(target, key) {
        if (typeof target[key] == 'object' && target[key] !== null) {
            return new Proxy(target[key], handler); // 懒代理，只有取值再次是对象的时候再次代理，提高性能
        }
        return Reflect.get(target, key);
    }
}
let obj = { school: { name: 'poetry', age: 20 } };
let proxy = new Proxy(obj, handler);

// 返回对象的代理
proxy.school
 

    
```

### [#](https://interview.poetries.top/docs/excellent-docs/7-Vue.html#说说你对-proxy-的理解-proxy-相比于-defineproperty-的优势)说说你对 proxy 的理解，Proxy 相比于 defineProperty 的优势

**`Object.defineProperty()` 的问题主要有三个：**

- **不能监听数组的变化**：无法监控到数组下标的变化，导致通过数组下标添加元素，不能实时响应
- **必须遍历对象的每个属性**：只能劫持对象的属性，从而需要对每个对象，每个属性进行遍历，如果属性值是对象，还需要深度遍历。`Proxy` 可以劫持整个对象，并返回一个新的对象
- **必须深层遍历嵌套的对象**

**Proxy的优势如下:**

- 针对对象：**针对整个对象，而不是对象的某个属性**，所以也就不需要对 `keys` 进行遍历
- 支持数组：`Proxy` 不需要对数组的方法进行重载，省去了众多 hack，减少代码量等于减少了维护成本，而且标准的就是最好的
- `Proxy`的第二个参数可以有 `13` 种拦截方：不限于`apply`、`ownKeys`、`deleteProperty`、`has`等等是`Object.defineProperty`不具备的
- `Proxy`返回的是一个新对象,我们可以只操作新的对象达到目的,而`Object.defineProperty`只能遍历对象属性直接修改
- `Proxy`作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利

[proxy详细使用点击查看(opens new window)](https://es6.ruanyifeng.com/#docs/proxy)

**Object.defineProperty的优势如下:**

> 兼容性好，支持 `IE9`，而 `Proxy` 的存在浏览器兼容性问题,而且无法用 `polyfill` 磨平

**defineProperty的属性值有哪些**

```js
Object.defineProperty(obj, prop, descriptor)

// obj 要定义属性的对象
// prop 要定义或修改的属性的名称
// descriptor 要定义或修改的属性描述符

Object.defineProperty(obj,"name",{
  value:"poetry", // 初始值
  writable:true, // 该属性是否可写入
  enumerable:true, // 该属性是否可被遍历得到（for...in， Object.keys等）
  configurable:true, // 定该属性是否可被删除，且除writable外的其他描述符是否可被修改
  get: function() {},
  set: function(newVal) {}
})
 

```

**相关代码如下**

```js
import { mutableHandlers } from "./baseHandlers"; // 代理相关逻辑
import { isObject } from "./util"; // 工具方法

export function reactive(target) {
  // 根据不同参数创建不同响应式对象
  return createReactiveObject(target, mutableHandlers);
}
function createReactiveObject(target, baseHandler) {
  if (!isObject(target)) {
    return target;
  }
  const observed = new Proxy(target, baseHandler);
  return observed;
}

const get = createGetter();
const set = createSetter();

function createGetter() {
  return function get(target, key, receiver) {
    // 对获取的值进行放射
    const res = Reflect.get(target, key, receiver);
    console.log("属性获取", key);
    if (isObject(res)) {
      // 如果获取的值是对象类型，则返回当前对象的代理对象
      return reactive(res);
    }
    return res;
  };
}
function createSetter() {
  return function set(target, key, value, receiver) {
    const oldValue = target[key];
    const hadKey = hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (!hadKey) {
      console.log("属性新增", key, value);
    } else if (hasChanged(value, oldValue)) {
      console.log("属性值被修改", key, value);
    }
    return result;
  };
}
export const mutableHandlers = {
  get, // 当获取属性时调用此方法
  set, // 当修改属性时调用此方法
};
    
```

`Proxy`只会代理对象的第一层，那么`Vue3`又是怎样处理这个问题的呢？

> 判断当前`Reflect.get的`返回值是否为`Object`，如果是则再通过`reactive`方法做代理， 这样就实现了深度观测。

**监测数组的时候可能触发多次get/set，那么如何防止触发多次呢？**

> 我们可以判断`key`是否为当前被代理对象`target`自身属性，也可以判断旧值与新值是否相等，只有满足以上两个条件之一时，才有可能执行`trigger`

## 5 Vue中如何检测数组变化

**前言**

`Vue` 不能检测到以下数组的变动：

- 当你利用索引直接设置一个数组项时，例如：`vm.items[indexOfItem] = newValue`
- 当你修改数组的长度时，例如：`vm.items.length = newLength`

`Vue` 提供了以下操作方法

```js
// Vue.set
Vue.set(vm.items, indexOfItem, newValue)
// vm.$set，Vue.set的一个别名
vm.$set(vm.items, indexOfItem, newValue)
// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)
 

    
```

**分析**

> 数组考虑性能原因没有用 `defineProperty` 对数组的每一项进行拦截，而是选择对 `7` 种数组（`push`,`shift`,`pop`,`splice`,`unshift`,`sort`,`reverse`）方法进行重写(`AOP` 切片思想)

所以在 `Vue` 中修改数组的索引和长度是无法监控到的。需要通过以上 `7` 种变异方法修改数组才会触发数组对应的 `watcher` 进行更新

- 用函数劫持的方式，重写了数组方法，具体呢就是更改了数组的原型，更改成自己的，用户调数组的一些方法的时候，走的就是自己的方法，然后通知视图去更新
- 数组里每一项可能是对象，那么我就是会对数组的每一项进行观测（且只有数组里的对象才能进行观测，观测过的也不会进行观测）

## 6 Vue中如何进行依赖收集？

- 每个属性都有自己的`dep`属性，存放他所依赖的`watcher`，当属性变化之后会通知自己对应的`watcher`去更新
- 默认会在初始化时调用`render`函数，此时会触发属性依赖收集 `dep.depend`
- 当属性发生修改时会触发`watcher`更新`dep.notify()`

## 7 Vue实例挂载的过程中发生了什么

### [#](https://interview.poetries.top/docs/excellent-docs/7-Vue.html#简单)简单

TIP

> **分析**
>
> 挂载过程完成了最重要的两件事：
>
> - 初始化
> - 建立更新机制
>
> 把这两件事说清楚即可！
>
> **回答范例**
>
> 1. 挂载过程指的是`app.mount()`过程，这个过程中整体上做了两件事：**初始化**和**建立更新机制**
> 2. 初始化会创建组件实例、初始化组件状态，创建各种响应式数据
> 3. 建立更新机制这一步会立即执行一次组件更新函数，这会首次执行组件渲染函数并执行`patch`将前面获得`vnode`转换为`dom`；同时首次执行渲染函数会创建它内部响应式数据之间和组件更新函数之间的依赖关系，这使得以后数据变化时会执行对应的更新函数

来看一下源码，在`src/core/instance/index.js` 中

```js
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}
 

    
```

可以看到 `Vue` 只能通过 `new` 关键字初始化，然后会调用 `this._init` 方法， 该方法在 `src/core/instance/init.js` 中定义

```js
Vue.prototype._init = function (options?: Object) {
  const vm: Component = this
  // a uid
  vm._uid = uid++

  let startTag, endTag
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    startTag = `vue-perf-start:${vm._uid}`
    endTag = `vue-perf-end:${vm._uid}`
    mark(startTag)
  }

  // a flag to avoid this being observed
  vm._isVue = true
  // merge options
  if (options && options._isComponent) {
    // optimize internal component instantiation
    // since dynamic options merging is pretty slow, and none of the
    // internal component options needs special treatment.
    initInternalComponent(vm, options)
  } else {
    vm.$options = mergeOptions(
      resolveConstructorOptions(vm.constructor),
      options || {},
      vm
    )
  }
  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
    initProxy(vm)
  } else {
    vm._renderProxy = vm
  }
  // expose real self
  vm._self = vm
  initLifecycle(vm)
  initEvents(vm)
  initRender(vm)
  callHook(vm, 'beforeCreate')
  initInjections(vm) // resolve injections before data/props
  initState(vm)
  initProvide(vm) // resolve provide after data/props
  callHook(vm, 'created')

  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    vm._name = formatComponentName(vm, false)
    mark(endTag)
    measure(`vue ${vm._name} init`, startTag, endTag)
  }

  if (vm.$options.el) {
    vm.$mount(vm.$options.el)
  }
}
 

    
```

> `Vue` 初始化主要就干了几件事情，`合并配置`，`初始化生命周期`，`初始化事件中心`，`初始化渲染`，`初始化 data`、`props`、`computed`、`watcher` 等

## 10 Vue生命周期相关

### [#](https://interview.poetries.top/docs/excellent-docs/7-Vue.html#vue的生命周期方法有哪些)Vue的生命周期方法有哪些

1. `Vue` 实例有一个完整的生命周期，也就是从`开始创建`、`初始化数据`、`编译模版`、`挂载Dom -> 渲染`、`更新 -> 渲染`、`卸载`等一系列过程，我们称这是`Vue`的生命周期
2. `Vue` 生命周期总共分为8个阶段`创建前/后`，`载入前/后`，`更新前/后`，`销毁前/后`

> ```
> beforeCreate` => `created` => `beforeMount` => `Mounted` => `beforeUpdate` => `updated` => `beforeDestroy` => `destroyed`。`keep-alive`下：`activated` `deactivated
> ```

| 生命周期vue2    | 生命周期vue3    | 描述                                                         |
| --------------- | --------------- | ------------------------------------------------------------ |
| `beforeCreate`  | `beforeCreate`  | 在实例初始化之后，数据观测(`data observer`) 之前被调用。     |
| `created`       | `created`       | 实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测(`data observer`)，属性和方法的运算， `watch/event` 事件回调。这里没有`$el` |
| `beforeMount`   | `beforeMount`   | 在挂载开始之前被调用：相关的 `render` 函数首次被调用         |
| `mounted`       | `mounted`       | `el` 被新创建的 `vm.$el` 替换，并挂载到实例上去之后调用该钩子 |
| `beforeUpdate`  | `beforeUpdate`  | 组件数据更新之前调用，发生在虚拟 `DOM` 打补丁之前            |
| `updated`       | `updated`       | 由于数据更改导致的虚拟 `DOM` 重新渲染和打补丁，在这之后会调用该钩子 |
| `beforeDestroy` | `beforeUnmount` | 实例销毁之前调用。在这一步，实例仍然完全可用                 |
| `destroyed`     | `unmounted`     | 实例销毁后调用。调用后， `Vue` 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。 该钩子在服务器端渲染期间不被调用。 |

其他几个生命周期

| 生命周期vue2    | 生命周期vue3      | 描述                                       |
| --------------- | ----------------- | ------------------------------------------ |
| `activated`     | `activated`       | `keep-alive`专属，组件被激活时调用         |
| `deactivated`   | `deactivated`     | `keep-alive`专属，组件被销毁时调用         |
| `errorCaptured` | `errorCaptured`   | 捕获一个来自子孙组件的错误时被调用         |
| -               | `renderTracked`   | 调试钩子，响应式依赖被收集时调用           |
| -               | `renderTriggered` | 调试钩子，响应式依赖被触发时调用           |
| -               | `serverPrefetch`  | `ssr only`，组件实例在服务器上被渲染前调用 |

1. **要掌握每个生命周期内部可以做什么事**

- `beforeCreate` 初始化`vue`实例，进行数据观测。执行时组件实例还未创建，通常用于插件开发中执行一些初始化任务
- `created` 组件初始化完毕，可以访问各种数据，获取接口数据等
- `beforeMount` 此阶段`vm.el`虽已完成`DOM`初始化，但并未挂载在`el`选项上
- `mounted` 实例已经挂载完成，可以进行一些`DOM`操作
- `beforeUpdate` 更新前，可用于获取更新前各种状态。此时`view`层还未更新，可用于获取更新前各种状态。可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。
- `updated` 完成`view`层的更新，更新后，所有状态已是最新。可以执行依赖于 `DOM` 的操作。然而在大多数情况下，你应该避免在此期间更改状态，因为这可能会导致更新无限循环。 该钩子在服务器端渲染期间不被调用。
- `destroyed` 可以执行一些优化操作,清空定时器，解除绑定事件
- vue3 `beforeunmount`：实例被销毁前调用，可用于一些定时器或订阅的取消
- vue3 `unmounted`：销毁一个实例。可清理它与其它实例的连接，解绑它的全部指令及事件监听器

![img](https://s.poetries.top/gitee/2020/07/61.png)

1. 组合式API生命周期钩子

你可以通过在生命周期钩子前面加上 “`on`” 来访问组件的生命周期钩子。

下表包含如何在 `setup()` 内部调用生命周期钩子：

| 选项式 API        | Hook inside setup   |
| ----------------- | ------------------- |
| `beforeCreate`    | 不需要*             |
| `created`         | 不需要*             |
| `beforeMount`     | `onBeforeMount`     |
| `mounted`         | `onMounted`         |
| `beforeUpdate`    | `onBeforeUpdate`    |
| `updated`         | `onUpdated`         |
| `beforeUnmount`   | `onBeforeUnmount`   |
| `unmounted`       | `onUnmounted`       |
| `errorCaptured`   | `onErrorCaptured`   |
| `renderTracked`   | `onRenderTracked`   |
| `renderTriggered` | `onRenderTriggered` |

> 因为 `setup` 是围绕 `beforeCreate` 和 `created` 生命周期钩子运行的，所以不需要显式地定义它们。换句话说，在这些钩子中编写的任何代码都应该直接在 `setup` 函数中编写

**`setup`和`created`谁先执行？**

- `beforeCreate`:组件被创建出来，组件的`methods`和`data`还没初始化好
- `setup`：在`beforeCreate`和`created`之前执行
- `created`:组件被创建出来，组件的`methods`和`data`已经初始化好了

> 由于在执行`setup`的时候，`created`还没有创建好，所以在`setup`函数内我们是无法使用`data`和`methods`的。所以`vue`为了让我们避免错误的使用，直接将`setup`函数内的`this`执行指向`undefined`

1. 其他问题

- **什么是vue生命周期？** Vue 实例从创建到销毁的过程，就是生命周期。从开始创建、初始化数据、编译模板、挂载Dom→渲染、更新→渲染、销毁等一系列过程，称之为 `Vue` 的生命周期。

- **vue生命周期的作用是什么？** 它的生命周期中有多个事件钩子，让我们在控制整个Vue实例的过程时更容易形成好的逻辑。

- **vue生命周期总共有几个阶段？** 它可以总共分为`8`个阶段：创建前/后、载入前/后、更新前/后、销毁前/销毁后。

- **第一次页面加载会触发哪几个钩子？** 会触发下面这几个`beforeCreate`、`created`、`beforeMount`、`mounted` 。

- **你的接口请求一般放在哪个生命周期中？** 接口请求一般放在`mounted`中，但需要注意的是服务端渲染时不支持`mounted`，需要放到`created`中

- DOM 渲染在哪个周期中就已经完成？ 在mounted中，

  - 注意 `mounted` 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 `vm.$nextTick` 替换掉 `mounted`

  ```js
    mounted: function () {
      this.$nextTick(function () {
          // Code that will run only after the
          // entire view has been rendered
      })
    }
   
  ```

### 父组件可以监听到子组件的生命周期吗

比如有父组件 `Parent` 和子组件 `Child`，如果父组件监听到子组件挂载 `mounted` 就做一些逻辑处理，可以通过以下写法实现：

```js
// Parent.vue
<Child @mounted="doSomething"/>
    
// Child.vue
mounted() {
  this.$emit("mounted");
}
 

    
```

以上需要手动通过 `$emit` 触发父组件的事件，更简单的方式可以在父组件引用子组件时通过 `@hook` 来监听即可，如下所示：

```js
//  Parent.vue
<Child @hook:mounted="doSomething" ></Child>

doSomething() {
   console.log('父组件监听到 mounted 钩子函数 ...');
},
    
//  Child.vue
mounted(){
   console.log('子组件触发 mounted 钩子函数 ...');
},    
    
// 以上输出顺序为：
// 子组件触发 mounted 钩子函数 ...
// 父组件监听到 mounted 钩子函数 ...     
 
    
```

当然 `@hook` 方法不仅仅是可以监听 `mounted`，其它的生命周期事件，例如：`created`，`updated` 等都可以监听

### Vue生命周期钩子是如何实现的

- `vue`的生命周期钩子就是回调函数而已，当创建组件实例的过程中会调用对应的钩子方法
- 内部会对钩子函数进行处理，将钩子函数维护成数组的形式

> `Vue` 的生命周期钩子核心实现是利用发布订阅模式先把用户传入的的生命周期钩子订阅好（内部采用数组的方式存储）然后在创建组件实例的过程中会一次执行对应的钩子方法（发布）

```html
<script>
    // Vue.options 中会存放所有全局属性

    // 会用自身的 + Vue.options 中的属性进行合并
    // Vue.mixin({
    //     beforeCreate() {
    //         console.log('before 0')
    //     },
    // })
    debugger;
    const vm = new Vue({
        el: '#app',
        beforeCreate: [
            function() {
                console.log('before 1')
            },
            function() {
                console.log('before 2')
            }
        ]
    });
    console.log(vm);
</script>
 
```

### Vue 的父子组件生命周期钩子函数执行顺序

- **渲染顺序**：先父后子，完成顺序：先子后父
- **更新顺序**：父更新导致子更新，子更新完成后父
- **销毁顺序**：先父后子，完成顺序：先子后父

**加载渲染过程**

父 `beforeCreate`->父 `created`->父 `beforeMount`->子 `beforeCreate`->子 `created`->子 `beforeMount`->子 `mounted`->父 `mounted`。**子组件先挂载，然后到父组件**

**子组件更新过程**

父 `beforeUpdate`->子 `beforeUpdate`->子 `updated`->父 `updated`

**父组件更新过程**

父 `beforeUpdate`->父 `updated`

**销毁过程**

父 `beforeDestroy`->子 `beforeDestroy`->子 `destroyed`->父 `destroyed`

> 之所以会这样是因为`Vue`创建过程是一个递归过程，先创建父组件，有子组件就会创建子组件，因此创建时先有父组件再有子组件；子组件首次创建时会添加`mounted`钩子到队列，等到`patch`结束再执行它们，可见子组件的`mounted`钩子是先进入到队列中的，因此等到`patch`结束执行这些钩子时也先执行。

## 11 Vue.mixin的使用场景和原理

- 在日常的开发中，我们经常会遇到在不同的组件中经常会需要用到一些相同或者相似的代码，这些代码的功能相对独立，可以通过 `Vue` 的 `mixin` 功能抽离公共的业务逻辑，原理类似“对象的继承”，当组件初始化时会调用 `mergeOptions` 方法进行合并，采用策略模式针对不同的属性进行合并。当组件和混入对象含有同名选项时，这些选项将以恰当的方式进行“合并”；如果混入的数据和本身组件的数据冲突，会以组件的数据为准
- `mixin`有很多缺陷如：命名冲突、依赖问题、数据来源问题

## 12 Vue组件data为什么必须是个函数？

- **根实例对象`data`可以是对象也可以是函数**（根实例是单例），不会产生数据污染情况
- **组件实例对象`data`必须为函数** `.vue`文件在使用的时候实际上会转换成一个`class`，一个组件被复用多次的话，也就会创建多个实例。本质上，这些实例用的都是同一个构造函数。如果`data`是对象的话，对象属于引用类型，会影响到所有的实例。所以为了保证组件在不同的实例之间`data`不冲突，`data`必须是一个函数，

**简版理解**

```js
// 1.组件的渲染流程 调用Vue.component -> Vue.extend -> 子类 -> new 子类
// Vue.extend 根据用户定义产生一个新的类
function Vue() {}
function Sub() { // 会将data存起来
    this.data = this.constructor.options.data();
}
Vue.extend = function(options) {
    Sub.options = options; // 静态属性
    return Sub;
}
let Child = Vue.extend({
    data:()=>( { name: 'test' })
});

// 两个组件就是两个实例, 希望数据互不感染
let child1 = new Child();
let child2 = new Child();

console.log(child1.data.name);
child1.data.name = 'poetry';
console.log(child2.data.name);

// 根不需要 任何的合并操作   根才有vm属性 所以他可以是函数和对象  但是组件mixin他们都没有vm 所以我就可以判断 当前data是不是个函数
```

## 13 nextTick在哪里使用？原理是？

- `nextTick` 中的回调是在下次 `DOM` 更新循环结束之后执行延迟回调，用于获得更新后的 `DOM`
- 在修改数据之后立即使用这个方法，获取更新后的 `DOM`
- 主要思路就是采用`微任务优先`的方式调用异步方法去执行 `nextTick` 包装的方法

> `nextTick` 方法主要是使用了宏任务和微任务,定义了一个异步方法.多次调用 `nextTick` 会将方法存入队列中，通过这个异步方法清空当前队列。所以这个 `nextTick` 方法就是异步方法

**根据执行环境分别尝试采用**

- 先采用`Promise`
- `Promise`不支持，再采用`MutationObserver`
- `MutationObserver`不支持，再采用`setImmediate`
- 如果以上都不行则采用`setTimeout`
- 最后执行`flushCallbacks`，把`callbacks`里面的数据依次执行

### nextTick回答范例

1. `nextTick` 中的回调是在下次 `DOM` 更新循环结束之后执行延迟回调，**用于获得更新后的 `DOM`**

2. `Vue`有个异步更新策略，意思是如果数据变化，`Vue`不会立刻更新DOM，而是开启一个队列，把组件更新函数保存在队列中，在同一事件循环中发生的所有数据变更会异步的批量更新。这一策略导致我们对数据的修改不会立刻体现在DOM上，此时如果想要获取更新后的DOM状态，就需要使用`nextTick`

3. 开发时，有两个场景我们会用到`nextTick`

   - `created`中想要获取`DOM`时

   - 响应式数据变化后获取`DOM`更新后的状态，比如希望获取列表更新后的高度

4. `nextTick`签名如下：`function nextTick(callback?: () => void): Promise<void>`

所以我们只需要在传入的回调函数中访问最新DOM状态即可，或者我们可以`await nextTick()`方法返回的`Promise`之后做这件事

5. 在`Vue`内部，`nextTick`之所以能够让我们看到DOM更新后的结果，是因为我们传入的`callback`会被添加到队列刷新函数(`flushSchedulerQueue`)的后面，这样等队列内部的更新函数都执行完毕，所有DOM操作也就结束了，`callback`自然能够获取到最新的DOM值

## 14 computed和watch相关

### [#](https://interview.poetries.top/docs/excellent-docs/7-Vue.html#computed和watch区别)computed和watch区别

1. 当页面中有某些数据依赖其他数据进行变动的时候，可以使用计算属性`computed`

> `Computed`本质是一个具备缓存的`watcher`，依赖的属性发生变化就会更新视图。 适用于计算比较消耗性能的计算场景。当表达式过于复杂时，在模板中放入过多逻辑会让模板难以维护，可以将复杂的逻辑放入计算属性中处理

![img](https://s.poetries.top/gitee/2020/01/25.png)

1. `watch`用于观察和监听页面上的vue实例，如果要在数据变化的同时进行异步操作或者是比较大的开销，那么`watch`为最佳选择

> `Watch`没有缓存性，更多的是观察的作用，可以监听某些数据执行回调。当我们需要深度监听对象中的属性时，可以打开`deep：true`选项，这样便会对对象中的每一项进行监听。这样会带来性能问题，优化的话可以使用字符串形式监听，如果没有写到组件中，不要忘记使用`unWatch`手动注销

![img](https://s.poetries.top/gitee/2020/01/26.png)

**computed:**

- `computed`是计算属性,也就是计算值,它更多用于计算值的场景
- `computed`具有缓存性,`computed`的值在`getter`执行后是会缓存的，只有在它依赖的属性值改变之后，下一次获取`computed`的值时才会重新调用对应的`getter`来计算
- `computed`适用于**计算比较消耗性能**的计算场景

**watch:**

- 更多的是「观察」的作用,类似于某些数据的监听回调,用于观察`props` `$emit`或者本组件的值,当数据变化时来执行回调进行后续操作
- 无缓存性，页面重新渲染时值不变化也会执行

**小结:**

- `computed`和`watch`都是基于`watcher`来实现的
- `computed`属性是具备缓存的，依赖的值不发生变化，对其取值时计算属性方法不会重新执行
- `watch`是监控值的变化，当值发生变化时调用其对应的回调函数
- 当我们要进行数值计算,而且依赖于其他数据，那么把这个数据设计为`computed`
- 如果你需要在某个数据变化时做一些事情，使用`watch`来观察这个数据变化

回答范例

**思路分析**

- 先看`computed`, `watch`两者定义，列举使用上的差异
- 列举使用场景上的差异，如何选择
- 使用细节、注意事项
- `vue3`变化

`computed`特点：具有响应式的返回值

```js
const count = ref(1)
const plusOne = computed(() => count.value + 1)
 

    
```

`watch`特点：侦测变化，执行回调

```js
const state = reactive({ count: 0 })
watch(
  () => state.count,
  (count, prevCount) => {
    /* ... */
  }
)
 

    
```

### **回答范例**

1. 计算属性可以**从组件数据派生出新数据**，最常见的使用方式是设置一个函数，返回计算之后的结果，`computed`和`methods`的差异是它**具备缓存性**，如果**依赖项不变时不会重新计算**。侦听器可以侦测某个响应式数据的变化并执行副作用，常见用法是传递一个函数，执行副作用，watch没有返回值，但可以执行异步操作等复杂逻辑
2. 计算属性常用场景是简化行内模板中的复杂表达式，模板中出现太多逻辑会是模板变得臃肿不易维护。侦听器常用场景是状态变化之后做一些额外的DOM操作或者异步操作。选择采用何用方案时首先看是否需要派生出新值，基本能用计算属性实现的方式首选计算属性.
3. 使用过程中有一些细节，比如计算属性也是可以传递对象，成为既可读又可写的计算属性。`watch`可以传递对象，设置`deep`、`immediate`等选项
4. `vue3`中`watch`选项发生了一些变化，例如不再能侦测一个点操作符之外的字符串形式的表达式； `reactivity API`中新出现了`watch`、`watchEffect`可以完全替代目前的`watch`选项，且功能更加强大

### vue3中 watch、watchEffect区别

- `watch`是惰性执行，也就是只有监听的值发生变化的时候才会执行，但是`watchEffect`不同，每次代码加载`watchEffect`都会执行（忽略`watch`第三个参数的配置，如果修改配置项也可以实现立即执行）
- `watch`需要传递监听的对象，`watchEffect`不需要
- `watch`只能监听响应式数据：`ref`定义的属性和`reactive`定义的对象，如果直接监听`reactive`定义对象中的属性是不允许的（会报警告），除非使用函数转换一下。其实就是官网上说的监听一个`getter`
- `watchEffect`如果监听`reactive`定义的对象是不起作用的，只能监听对象中的属性

### Watch中的deep:true是如何实现的

> 当用户指定了 `watch` 中的deep属性为 `true` 时，如果当前监控的值是数组类型。会对对象中的每一项进行求值，此时会将当前 `watcher`存入到对应属性的依赖中，这样数组中对象发生变化时也会通知数据更新

### Vue computed 实现

- 建立与其他属性（如：`data`、 `Store`）的联系；
- 属性改变后，通知计算属性重新计算

> 实现时，主要如下

- 初始化 `data`， 使用 `Object.defineProperty` 把这些属性全部转为 `getter/setter`。
- 初始化 `computed`, 遍历 `computed` 里的每个属性，每个 `computed` 属性都是一个 `watch` 实例。每个属性提供的函数作为属性的 `getter`，使用 `Object.defineProperty` 转化。
- `Object.defineProperty getter` 依赖收集。用于依赖发生变化时，触发属性重新计算。
- 若出现当前 `computed` 计算属性嵌套其他 `computed` 计算属性时，先进行其他的依赖收集

### [#](https://interview.poetries.top/docs/excellent-docs/7-Vue.html#watch-原理)watch 原理

`watch` 本质上是为每个监听属性 `setter` 创建了一个 `watcher`，当被监听的属性更新时，调用传入的回调函数。常见的配置选项有 `deep` 和 `immediate`，对应原理如下

- `deep`：深度监听对象，为对象的每一个属性创建一个 `watcher`，从而确保对象的每一个属性更新时都会触发传入的回调函数。主要原因在于对象属于引用类型，单个属性的更新并不会触发对象 `setter`，因此引入 `deep` 能够很好地解决监听对象的问题。同时也会引入判断机制，确保在多个属性更新时回调函数仅触发一次，避免性能浪费。
- `immediate`：在初始化时直接调用回调函数，可以通过在 `created` 阶段手动调用回调函数实现相同的效果

## 15 Vue.set的实现原理

- 给对象和数组本身都增加了`dep`属性
- 当给对象新增不存在的属性则触发对象依赖的`watcher`去更新
- 当修改数组索引时，我们调用数组本身的`splice`去更新数组（数组的响应式原理就是重新了`splice`等方法，调用`splice`就会触发视图更新）

**基本使用**

> 以下方法调用会改变原始数组：`push()`, `pop()`, `shift()`, `unshift()`, `splice()`, `sort()`, `reverse()`,`Vue.set( target, key, value )`

- 调用方法：

  ```
  Vue.set(target, key, value )
  ```

  - `target`：要更改的数据源(可以是对象或者数组)
  - `key`：要更改的具体数据
  - `value` ：重新赋的值

```html
<div id="app">{{user.name}} {{user.age}}</div>
<div id="app"></div>
<script>
    // 1. 依赖收集的特点：给每个属性都增加一个dep属性，dep属性会进行收集，收集的是watcher
    // 2. vue会给每个对象也增加一个dep属性
    const vm = new Vue({
        el: '#app',
        data: { // vm._data  
            user: {name:'poetry'}
        }
    });
    // 对象的话：调用defineReactive在user对象上定义一个age属性，增加到响应式数据中，触发对象本身的watcher，ob.dep.notify()更新 
    // 如果是数组 通过调用 splice方法，触发视图更新
    vm.$set(vm.user, 'age', 20); // 不能给根属性添加，因为给根添加属性 性能消耗太大，需要做很多处理

    // 修改肯定是同步的 -> 更新都是一步的  queuewatcher
</script>
 
```

**我们阅读以上源码可知，vm.$set 的实现原理是：**

- **如果目标是数组**，直接使用数组的 `splice` 方法触发响应式；
- **如果目标是对象**，会先判读属性是否存在、对象是否是响应式，最终如果要对属性进行响应式处理，则是通过调用 `defineReactive` 方法进行响应式处理（ `defineReactive` 方法就是 `Vue` 在初始化对象时，给对象属性采用 `Object.defineProperty` 动态添加 `getter` 和 `setter` 的功能所调用的方法）

## 项目：electron+vue3+ts

### 1.electron框架如何实现把h5页面挂载到客户端？

- ## 实现原理

  Electron通过**主进程**创建窗口，并在**渲染进程**中加载H5页面，同时支持：

  - Chromium内核渲染网页
  - Node.js访问系统API
  - 跨进程通信（IPC）

  ------

  ## 具体实现步骤

  ### 方案一：加载本地HTML文件 win.loadFile('src/index.html') 

  javascript

  ```javascript
  // main.js（主进程）
  const { app, BrowserWindow } = require('electron')
  
  function createWindow() {
    const win = new BrowserWindow({
      width: 1200,
      height: 800,
      webPreferences: {
        nodeIntegration: true  // 启用Node.js集成
      }
    })
    
    // 加载本地文件
    win.loadFile('src/index.html') 
  }
  
  app.whenReady().then(createWindow)
  ```

  ### 方案二：加载远程URL win.loadURL('https://your-web-app-domain.com')

  javascript

  ```javascript
  // 主进程修改加载方式
  win.loadURL('https://your-web-app-domain.com')
  
  // 需要处理跨域问题时
  win.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Access-Control-Allow-Origin': ['*']
      }
    })
  })
  ```

  ------

  ## 核心配置项

  ### 1. 窗口配置参数

  |     参数      |     说明     | 示例值  |
  | :-----------: | :----------: | :-----: |
  |    `width`    |   窗口宽度   | `1200`  |
  |   `height`    |   窗口高度   |  `800`  |
  |    `frame`    | 是否显示边框 | `false` |
  | `transparent` |   窗口透明   | `true`  |

  ### 2. 安全配置建议

  javascript

  ```javascript
  new BrowserWindow({
    webPreferences: {
      contextIsolation: true,  // 启用上下文隔离
      sandbox: true,           // 启用沙箱模式
      preload: path.join(__dirname, 'preload.js')  // 预加载脚本
    }
  })
  ```

  ------

  ## 打包部署

  ### 使用electron-builder

  ------

  ## 常见问题排查

  ### 1. 页面白屏

  - ✅ 检查文件路径是否正确
  - ✅ 开启开发者工具调试

  javascript

  ```javascript
  win.webContents.openDevTools()
  ```

  ### 2. 性能优化

  javascript

  ```javascript
  // 禁用GPU加速（低配设备）
  app.disableHardwareAcceleration()
  
  // 启用内存优化
  win.webContents.on('dom-ready', () => {
    win.webContents.setZoomFactor(1.0)
  })
  ```



### 2.Electron 本地交互实现指南（文件读写篇）

Electron 通过主进程（Main Process）与渲染进程（Renderer Process）的分工协作实现本地系统交互。文件读写等敏感操作需通过主进程完成，渲染进程通过 IPC（进程间通信）机制与主进程交互。

---

#### 一、核心实现原理

##### 1. 进程分工

- **主进程**：拥有完整 Node.js 环境，可直接使用 `fs` 模块操作文件系统
- **渲染进程**：运行在浏览器环境，需通过 IPC 向主进程发起文件操作请求

##### 2. IPC 通信机制

- **ipcMain**：主进程监听器
- **ipcRenderer**：渲染进程触发器
- **Context Bridge**：安全暴露 API 的桥梁

---

#### 二、文件读写实现步骤

##### 1. 基础文件操作

```javascript
// 主进程（main.js）
const fs = require('fs');
ipcMain.on('read-file', (event, path) => {
  fs.readFile(path, 'utf-8', (err, data) => {
    event.sender.send('file-content', data);
  });
});

// 渲染进程（preload.js）
contextBridge.exposeInMainWorld('electronAPI', {
  readFile: (path) => ipcRenderer.send('read-file', path),
  onFileContent: (callback) => ipcRenderer.on('file-content', callback)
});
```

##### 2. 文件对话框集成

```javascript
// 渲染进程调用文件选择器
const { dialog } = require('electron').remote;
dialog.showOpenDialog({
  properties: ['openFile'],
  filters: [{ name: 'Text', extensions: ['txt'] }]
}).then(result => {
  if (!result.canceled) {
    const path = result.filePaths[0];
    window.electronAPI.readFile(path);
  }
});
```

##### 3. 实时文件监听

使用 `chokidar` 库实现目录监控：

```javascript
// 主进程
const chokidar = require('chokidar');
ipcMain.on('watch-directory', (event, path) => {
  const watcher = chokidar.watch(path, {
    persistent: true,
    ignoreInitial: true
  });

  watcher.on('all', (eventType, filePath) => {
    event.sender.send('file-change', { type: eventType, path: filePath });
  });
});
```

---

#### 三、安全配置要点

1. ##### **预加载脚本配置**：

```javascript
// 创建 BrowserWindow 时配置
new BrowserWindow({
  webPreferences: {
    nodeIntegration: false,
    contextIsolation: true,
    preload: path.join(__dirname, 'preload.js')
  }
})
```

2. **权限控制**：

- 使用 `path.join()` 处理路径拼接
- 验证用户选择的文件路径
- 限制可访问目录范围

---

#### 四、扩展方案推荐

| 方案类型   | 实现方式                | 适用场景       |
| ---------- | ----------------------- | -------------- |
| 原生存储   | `electron-store` 模块   | 应用配置存储   |
| 数据库方案 | SQLite + `knex.js`      | 结构化数据存储 |
| 自动化操作 | `fs-extra` 扩展库       | 复杂文件操作   |
| 二进制处理 | `Buffer` + `Stream` API | 大文件分块处理 |

---

#### 五、最佳实践建议

1. ##### **遵循最小权限原则**：渲染进程不应直接访问 `fs` 模块

2. ##### **错误处理标准化**：统一封装错误码和提示信息

3. ##### **性能优化**：大文件操作使用流式处理

4. ##### **多进程通信**：采用 `invoke/handle` 模式替代单向事件

通过合理运用 IPC 通信机制与 Node.js 原生模块，开发者可以构建安全高效的本地文件交互系统。建议结合官方文档与社区最佳实践进行深度定制。

### 3.Electron 主进程与渲染进程的区别

Electron 的主进程（Main Process）和渲染进程（Renderer Process）是其多进程架构的核心组成部分，两者的区别主要体现在以下方面：

---

#### 1. **职责与功能**

- **主进程**  
  - **唯一性**：每个 Electron 应用有且仅有一个主进程。
  - **核心管理**：负责应用的生命周期（启动、退出等）、创建/管理窗口（通过 `BrowserWindow`）、与操作系统交互（如文件系统、菜单栏、对话框等）。
  - **系统级操作**：可以访问 Node.js 和 Electron 的所有 API，执行底层任务（如网络请求、加密数据操作）。

- **渲染进程**  
  - **多实例性**：每个窗口对应一个独立的渲染进程。
  - **界面展示**：负责渲染网页内容（HTML/CSS/JavaScript），处理用户交互（如按钮点击、表单输入）。
  - **限制性**：默认无法直接访问 Node.js API（需通过预加载脚本或配置 `nodeIntegration`）。

---

#### 2. **运行环境**

- **主进程**  
  - 运行在 **Node.js 环境**中，支持所有 Node.js 模块（如 `fs`、`path`）。
  - 可以通过 `ipcMain` 模块监听来自渲染进程的消息。

- **渲染进程**  
  - 运行在 **Chromium 浏览器环境**中，支持 Web API（如 DOM 操作、Fetch API）。
  - 通过 `ipcRenderer` 模块向主进程发送消息。

---

#### 3. **通信机制**

- **进程间通信（IPC）**  
  - **主进程 → 渲染进程**：通过 `BrowserWindow.webContents.send()` 发送消息。
  - **渲染进程 → 主进程**：通过 `ipcRenderer.send()` 发送消息，主进程通过 `ipcMain.on()` 监听。
  - **预加载脚本（Preload Script）**：在渲染进程中桥接 Node.js 功能，通过 `contextBridge.exposeInMainWorld()` 安全暴露 API。

---

#### 4. **安全性与隔离**

- **主进程**  
  - 可执行敏感操作（如文件读写、系统命令），需避免直接暴露给用户界面。

- **渲染进程**  
  - 默认启用 **上下文隔离（Context Isolation）**，防止渲染进程直接访问 Node.js 全局对象。
  - 通过预加载脚本限制可访问的 API，避免安全漏洞。

---

#### 5. **典型应用场景**

- **主进程**  

  - 创建窗口、注册全局快捷键、处理系统托盘图标。

  - 示例代码：

    ```javascript
    const { app, BrowserWindow } = require('electron');
    app.whenReady().then(() => {
      const win = new BrowserWindow({ width: 800, height: 600 });
      win.loadFile('index.html');
    });
    ```

- **渲染进程**  

  - 实现动态 UI 效果、响应用户输入、调用主进程功能。

  - 示例代码：

    ```javascript
    // 预加载脚本中暴露 API
    contextBridge.exposeInMainWorld('electronAPI', {
      openFile: () => ipcRenderer.invoke('dialog:openFile')
    });
    ```

---

#### 总结

主进程是 Electron 应用的“大脑”，负责全局管理和系统交互；渲染进程则是“界面引擎”，专注用户交互和内容展示。两者通过 IPC 实现松耦合通信，同时通过安全机制（如预加载脚本）平衡功能与安全性。

### 4.Electron 进程间通信与更新机制详解

#### 一、Electron 进程间通信（IPC）

#### 1. 基础通信模块

Electron 通过 `ipcMain`（主进程）和 `ipcRenderer`（渲染进程）模块实现进程间通信，支持单向和双向消息传递。

#### （1）渲染进程 → 主进程

- **单向通信**  

  ```javascript
  // 渲染进程（使用预加载脚本）
  contextBridge.exposeInMainWorld('electronAPI', {
    sendMessage: (message) => ipcRenderer.send('msg-channel', message)
  });
  
  // 主进程
  ipcMain.on('msg-channel', (event, message) => {
    console.log('Received:', message);
  });
  ```

- 双向通信使用

  ```
  ipcRenderer.invoke
  ```

  与

  ```
  ipcMain.handle
  ```

   

  实现异步请求-响应模式javascript

  ```javascript
  // 渲染进程
  const result = await window.electronAPI.getData();
  
  // 主进程
  ipcMain.handle('get-data', async () => {
    return fetchDataFromDB();
  });
  ```

#### （2）主进程 → 渲染进程

通过 `webContents.send` 主动推送消息：

javascript

```javascript
// 主进程
win.webContents.send('update-notify', { status: 'ready' });

// 渲染进程
ipcRenderer.on('update-notify', (event, data) => {
  console.log('Update:', data.status);
});
```

#### 2. 高级通信场景

- 上下文隔离：通过预加载脚本（Preload）使用

  ```
  contextBridge
  ```

   安全暴露 API，避免直接暴露 Node.js 能力到渲染进程

- **多窗口通信**：主进程作为中介，转发不同渲染进程的消息。

------

### 5.Electron 应用更新机制

##### 1. 使用 `electron-updater` 实现自动化更新

###### （1）核心流程

1. 检查更新：应用启动时请求更新服务器，比对版本号（如

   ```
   semver库
   ```

2. 下载更新：支持全量更新（完整安装包）和增量更新（基于内容分块的差异下载）

3. **应用更新**：静默安装并重启应用。

###### （2）配置示例

javascript

```javascript
// 主进程配置
autoUpdater.setFeedURL({
  provider: 'github',
  repo: 'my-app',
  owner: 'user'
});

autoUpdater.checkForUpdatesAndNotify();
```

###### （3）高级特性

- 灰度发布：通过 GUID 哈希控制部分用户优先更新。
- 安全验证：使用 SHA512 校验文件完整性，HTTPS 加密传输。
- 错误处理：网络重试、回滚机制、日志记录（如 Winston 库）

##### 2. 更新策略优化

- 增量更新：利用blockmap文件识别差异块，减少下载量（如 CDC 分块算法）。
- **CDN 加速**：将更新文件托管到云存储（如 AWS S3、阿里云 OSS）。
- CI/CD 集成：通过 GitHub Actions 或 Jenkins 实现自动构建和发布

------

##### 3.总结

|     模块     |                            关键点                            |
| :----------: | :----------------------------------------------------------: |
| **IPC 通信** | 使用 `ipcMain`/`ipcRenderer`，区分单向/双向通信，优先采用上下文隔离 |
| **自动更新** | 依赖 `electron-updater`，支持全量/增量更新，需处理错误和安全性 |
| **性能优化** |            增量更新减少带宽消耗，并行下载提升速度            |
| **安全实践** |            校验文件哈希，HTTPS 加密，避免降级攻击            |