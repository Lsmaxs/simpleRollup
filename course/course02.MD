
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
├── view # HTML使用例子
│   └── index.html
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
yarn add -D @babel/core @babel/preset-env @babel/polyfill  @babel/runtime @babel/plugin-transform-runtime
```

- `rollup` 模块是`rollup`编译的核心模块
- `rollup-plugin-babel` 模块是`rollup.js`支持`babel`官方编译插件模块
- `@babel/core` 是官方 `babel` 编译核心模块
- `@babel/preset-env` 是官方 `babel` 编译解析ES6+ 语言的扩展模块
- `@babel/polyfill` 是官方 `babel` 提供模拟完整的ES2015 +环境的补丁
- `@babel/plugin-transform-runtime` 是依赖于`@babel/runtime`会由工具自动添加，主要的功能是为api提供沙箱的垫片方案，不会污染全局的api

## rollup打包配置  

- 编译的配置文件路径 `./config/rollup.config.js`
- 编译文件内容
```
const path = require('path');
import babel from 'rollup-plugin-babel';

const resolve =  function (filePath){
    return path.resolve(__dirname,"../",filePath)
}

module.exports = {
    input: resolve('src/index.js'),
    output: {
        file: resolve('dist/dist.js'),
        format: 'umd' // iife  AMD
    },
    plugins: [ 
        babel({
            runtimeHelpers: true, // 开启runtime模式
            exclude: 'node_modules/**' // 只编译我们的源代码
        })
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
import Dome from './lib/dome.js'

const Array1 = Array(10).fill(6);

const Array2 = ['a','b','v','d']

const newArray = [...Array1,...Array2];

const ArrayFlat = newArray.flat();

async function initDemo () {
    let data = await Dome();
    console.log(data);
}

initDemo();
```
- 源码路径`./src/lib/demo.js`
- 源码内容
```
function dome() {
    return new Promose((res, rej) => {
        try {
            setTimeout(() => {
                const objA = {
                    'vv': 1
                }
                const objB = {
                    'bb': 2
                }
                const mergeObj = {
                    ...objA,
                    ...objB
                }
                res(mergeObj)
            }, 3000)
        } catch (err) {
            rej(err)
        }
    })
}

export default dome
```

## 编译结果

- 在dome目录下运行 `yarn run dev `
- 编译结果就在目录 `./dist/` 下
- 编译结果为
```
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('@babel/runtime/regenerator'), require('@babel/runtime/helpers/asyncToGenerator'), require('@babel/runtime/helpers/toConsumableArray'), require('@babel/runtime/helpers/objectSpread')) :
    typeof define === 'function' && define.amd ? define(['@babel/runtime/regenerator', '@babel/runtime/helpers/asyncToGenerator', '@babel/runtime/helpers/toConsumableArray', '@babel/runtime/helpers/objectSpread'], factory) :
    (global = global || self, factory(global._regeneratorRuntime, global._asyncToGenerator, global._toConsumableArray, global._objectSpread));
}(this, function (_regeneratorRuntime, _asyncToGenerator, _toConsumableArray, _objectSpread) { 'use strict';

    _regeneratorRuntime = _regeneratorRuntime && _regeneratorRuntime.hasOwnProperty('default') ? _regeneratorRuntime['default'] : _regeneratorRuntime;
    _asyncToGenerator = _asyncToGenerator && _asyncToGenerator.hasOwnProperty('default') ? _asyncToGenerator['default'] : _asyncToGenerator;
    _toConsumableArray = _toConsumableArray && _toConsumableArray.hasOwnProperty('default') ? _toConsumableArray['default'] : _toConsumableArray;
    _objectSpread = _objectSpread && _objectSpread.hasOwnProperty('default') ? _objectSpread['default'] : _objectSpread;

    function dome() {
      return new Promose(function (res, rej) {
        try {
          setTimeout(function () {
            var objA = {
              'vv': 1
            };
            var objB = {
              'bb': 2
            };

            var mergeObj = _objectSpread({}, objA, objB);

            res(mergeObj);
          }, 3000);
        } catch (err) {
          rej(err);
        }
      });
    }

    var Array1 = Array(10).fill(6);
    var Array2 = ['a', 'b', 'v', 'd'];
    var newArray = [].concat(_toConsumableArray(Array1), Array2);
    var ArrayFlat = newArray.flat();

    function initDemo() {
      return _initDemo.apply(this, arguments);
    }

    function _initDemo() {
      _initDemo = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee() {
        var data;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return dome();

              case 2:
                data = _context.sent;
                console.log(data);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return _initDemo.apply(this, arguments);
    }

    initDemo();

}));
```

## 记录  

讲述了 `rollup.js` 编译 ES6+的代码，运用了babel插件编译更加高级的ES语法。但是注意使用过程中 `@babel/polyfill` 的引用。
