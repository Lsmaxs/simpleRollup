
# ES6以上编译配置
> 本Dome主要是让`rollup.js`下编译`ES6+`编码

## 实现功能
- 编译ES6新特性代码
- 编译成UMD模块格式

## 目录结构

```
·.
├── config # 编译脚本
│   └── rollup.config.js
├── dist # 编译结果
│   └── dist.js
├── package.json
└── src # ES6 源码
    ├── index.js
    └── lib
        └── demo.js

```
## 依赖安装

```
## 基础模块
yarn add -D rollup 

## 编译ES6新特征的其他模块
yarn add -D rollup-plugin-babel babel-core babel-preset-env babel-plugin-transform-object-rest-spread
```

- `rollup` 模块是`rollup`编译的核心模块
- `rollup-plugin-babel` 模块是`rollup.js`支持`babel`官方编译插件模块
- `babel-core` 是官方 `babel` 编译核心模块
- `babel-preset-latest` 是官方 `babel` 编译解析ES6+ 语言的扩展模块
- `babel-plugin-transform-object-rest-spread` 是官方 babel 编译ES6对象扩展的编译插件

## rollup打包配置  

- 编译的配置文件路径 `./config/rollup.config.js`
- 编译文件内容
```
const path = require('path');
const json = require('rollup-plugin-json');
const buble = require('rollup-plugin-buble');

const resolve =  function (filePath){
    return path.resolve(__dirname,"../",filePath)
}

module.exports = {
    input: resolve('src/index.js'),
    output: {
        file: resolve('dist/dist.js'),
        format: 'umd' // 另外有iife、AMD 等格式选择
    },
    plugins: [ 
        json(), 
        buble() 
    ]
}

```
`./package.json`配置编译执行脚本
```
{
    "scripts":{
        "scripts": {
            "dev": "rollup -c ./config/rollup.config.js"
        },
    }
}
```

## 待编译ES6源码  

- 源码路径`./src/index.js`
- 源码内容
```
const Array1 = Array(10).fill(6);

const Array2 = ['a','b','v','d']

const newArray = [...Array1,...Array2]; // 简易ES6测试

const ArrayFlat = newArray.flat(); // ES6数组扩展测试

console.log(`Array1:${Array1}`)
console.log(`newArray:${newArray}`)
console.log(`ArrayFlat:${ArrayFlat}`)
```

## 编译结果

- 在dome目录下运行 `yarn run dev `
- 编译结果就在目录 `./dist/` 下
- 编译结果为
```
(function (factory) {
	typeof define === 'function' && define.amd ? define(factory) :
	factory();
}(function () { 'use strict';

	var Array1 = Array(10).fill(6);

	var Array2 = ['a','b','v','d'];

	var newArray = Array1.concat( Array2);

	var ArrayFlat = newArray.flat(); // 复杂ES6扩展编译失败

	console.log(("Array1:" + Array1));
	console.log(("newArray:" + newArray));
	console.log(("ArrayFlat:" + ArrayFlat));

}));
```

## 记录  

目前只是最简单的ES6语法编译，但是实际项目中肯定会用到ES6+以上的语法。同时本篇的`rollup-plugin-buble`插件只是能编译简单的ES6语法，对于更加复杂的ES6+(包括ES7,ES8)等语法，就需要`rollup-plugin-babel`插件结合`babel`原生编译插件去处理，在后面会做编译配置介绍。