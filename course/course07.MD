
# Scss编译配置
> 本篇主要讲述利用`rollup`执行配置文件编译的编译自带了watch代码的变更能力，并且执行Node.js调用API进行热编译。


## 依赖安装

```
## 基础模块
yarn add -D rollup 

## 编译ES6新特征的其他模块
yarn add -D @babel/core @babel/preset-env @babel/polyfill  @babel/runtime @babel/plugin-transform-runtime rollup-plugin-commonjs  rollup-plugin-node-resolve

## 安装 rollup.js scss编译插件模块
yarn add -D rollup-plugin-postcss 
yarn add -D node-sass

## 安装 rollup.js 编译本地开发服务插件
yarn add -D  rollup-plugin-serve

## 安装 rollup.js 编译混淆压缩插件
yarn add -D  rollup-plugin-uglify

## 开发例子用到的依赖
yarn add -D  chalk ## 日志样式模块
yarn add -D  chokidar ## 目录监听模块
yarn add -D  koa  koa-static ## 服务模块
yarn add -D  koa-compose ## koa流程控制模块，用来控制流程编译
```

## rollup打包配置拆分  

- 编译的基础配置文件路径 `./config/rollup.config.base.js`
- 编译文件内容
```
const path = require('path');
const NodeResolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const babel = require('rollup-plugin-babel')
const postcss = require('rollup-plugin-postcss');
const sass = require('node-sass');

const isProductionEnv = process.env.NODE_ENV === 'production'


const resolve = function (filePath) {
    return path.resolve(__dirname, "../", filePath)
}

const processSass = function(context,paylpad){
    return new Promise((resolve,reject)=>{
        sass.render({
            file:context
        },function(err,result){
            if(err){
                reject(err)
                return 
            }
            resolve(result)
        })
    })
}

module.exports = {
    input: {
        'dist':resolve('src/index.js'),
        'sc/memo':resolve('src/memo/index.js')
    },
    experimentalCodeSplitting:true,
    output:{
        format: 'cjs', // iife  AMD
        dir: 'dist'
    },
    plugins: [
        NodeResolve(),
        commonjs(),
        babel({
            runtimeHelpers: true,
            exclude: 'node_modules/**' // 只编译我们的源代码
        }),
        postcss({
            extract: true,
            minimize: isProductionEnv,
            extensions: [ 'css','scss' ],
            process: processSass,
          }),
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
    "dev": "rollup -c ./config/rollup.config.dev.js --watch",
    "prod": "rollup -c ./config/rollup.config.prod.js"
  },
}

```

## 待编译源码  

- 源码路径`./src/index.js`
- 源码内容
```
import Dome from './lib/dome.js'

import './scss/index.scss';
// todo ...

```
- 源码路径`./src/memo/index.js`
- 源码内容
```
import "../scss/memo.scss";
setTimeout(()=>{
    console.log('Hi 欢迎来到Rollup ─=≡Σ(((つ•̀ω•́)つ')
},3000)
```

- 源码路径`./src/scss/index.scss`
- 源码内容
```
$blue:rgb(32, 98, 240);
body{
    background: #f1f1f1;

    h1{
        color:$blue;
    }

    .text{
        font-size: .8rem;
        line-height: 2em;
        span{
            color:$blue;
        }
    }
}
```

## 编译结果

- 在dome目录下运行 `yarn run dev `
- 编译结果就在目录 `./dist/` 下
  - ES5代码文件`./dist/dist.js`
  - css文件`./dist/dist.css`
- 插件本地服务启动，效果如下：
```
rollup v1.4.1
bundles /Users/sean/work/MyGitHhub/simpleRollup/dome/course_07/src/index.js, /Users/sean/work/MyGitHhub/simpleRollup/dome/course_07/src/memo/index.js → dist...
created dist in 45ms

[2019-03-27 10:44:43] waiting for changes...

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
    <link rel="stylesheet" href="./dist.css">
</head>

<body>
    <h1>This is course07</h1>
    <section>/(ﾟ▽ﾟ)/</section>
    <p class='text'>这是一份 <span>Scss</span>  编译测试Dome</p>
    <script src="./dist.js"></script>
    <script src="./sc/memo.js"></script>

</body>

</html>

```
-  访问`http://localhost:3011`
-  可随意修改页面样式


## 记录  

主要讲述是，`rollup.js`编译 `*.css`文件的能力。顺便配置了 `*.scss`文件的编译配置。 `*.less`的配置雷同。