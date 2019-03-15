
# 多文件输入输出配置
> 之前都是单页应用的配置，现在学习设置多页多文件输入输出编译。

## 实现功能  

- 编译输入的多个`ES6+`js源码 `src/`
- 编译输出多个`ES5`js代码 `dist/`

## 依赖安装

```
## 基础模块
yarn add -D rollup 

## 编译ES6新特征的其他模块
yarn add -D @babel/core @babel/preset-env @babel/polyfill  @babel/runtime @babel/plugin-transform-runtime rollup-plugin-commonjs  rollup-plugin-node-resolve

## 安装 rollup.js 编译本地开发服务插件
yarn add -D --save-dev rollup-plugin-serve

## 安装 rollup.js 编译混淆压缩插件
yarn add -D --save-dev rollup-plugin-uglify
```

## rollup打包配置拆分  

- 编译的基础配置文件路径 `./config/rollup.config.base.js`
- 编译文件内容
```
const path = require('path');
const NodeResolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const babel = require('rollup-plugin-babel')

const resolve = function (filePath) {
    return path.resolve(__dirname, "../", filePath)
}

module.exports = {
    // 多文件输入配置
    input: {
        'dist':resolve('src/index.js'),
        'sc/memo':resolve('src/memo/index.js')
    },
    experimentalCodeSplitting:true,
    output:{
        format: 'cjs', // iife  AMD
        dir: 'dist' // 输出配置文件夹
    },
    plugins: [
        NodeResolve(),
        commonjs(),
        babel({
            runtimeHelpers: true,
            exclude: 'node_modules/**' // 只编译我们的源代码
        })
    ],
    
}
```

- 编译的开发模式配置文件路径 `./config/rollup.config.dev.js`
- 编译文件内容
```
const path = require('path');
import serves from 'rollup-plugin-serve';
const  baseConfig = require('./rollup.config.base');

const resolve = function (filePath) {
    return path.resolve(__dirname, "../", filePath)
}

baseConfig.output.sourcemap = true;

baseConfig.plugins = [
    ...baseConfig.plugins,
    serves({
        port: 3011,
        contentBase: [resolve('view'), resolve('dist')]  // 设置 view的访问目录和dist的访问目录
    })
]

module.exports = baseConfig
```

- 编译的生产模式配置文件路径 `./config/rollup.config.prod.js`
- 编译文件内容
```
const path = require('path');
import { uglify}  from 'rollup-plugin-uglify';
const  baseConfig = require('./rollup.config.base');

const resolve = function (filePath) {
    return path.resolve(__dirname, "../", filePath)
}

baseConfig.output.sourcemap = false;

baseConfig.plugins = [
    ...baseConfig.plugins,
    uglify()
]

module.exports = baseConfig

```

- 配置`package.json`编译执行脚本
- 文件内容
```
{
    "scripts": {
        "dev": "rollup -c ./config/rollup.config.dev.js",
        "prod": "rollup -c ./config/rollup.config.prod.js"
    },
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
- 源码路径`./src/memo/index.js`
- 源码内容
```

setTimeout(()=>{
    console.log('Hi 欢迎来到Rollup ─=≡Σ(((つ•̀ω•́)つ')
},3000)
```

## 编译结果

- 在dome目录下运行 `yarn run prod `
- 编译结果就在目录 `./dist/` 下
  - ES5代码文件`./dist/dist.js`
- 插件本地服务启动，效果如下：
```
> rollup@1.0.0 prod /Users/sean/work/MyGitHhub/simpleRollup/dome/course_04
> rollup -c ./config/rollup.config.prod.js


/Users/sean/work/MyGitHhub/simpleRollup/dome/course_04/src/index.js → dist/dist.js...
created dist/dist.js in 1.3s
```

## 查看效果
- `view`目录静态HTML文件 `./view/index.html`
- `view`源码
```
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>rollup course</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>
    <h1>This is course05</h1>
    <section>/(ﾟ▽ﾟ)/</section>
    <script src="./dist.js"></script>
    <script src="./sc/memo.js"></script>

</body>

</html>

```
-  访问`http://localhost:3011`
-  打开工作台console会显示运行结果
```
▽ {vv: 1, bb: 2}
  bb: 2
  vv: 1
▽ __proto__: Object

Hi 欢迎来到Rollup ─=≡Σ(((つ•̀ω•́)つ
```


## 记录  

主要讲述是，`rollup.js`的多文件输入输出。有两种方式 一种是将输出的`rollup.js`配置由原来的config的`object`变成`[object,object,...]` 代表多个文件编译配置、 另一种是本文的配置的情况。