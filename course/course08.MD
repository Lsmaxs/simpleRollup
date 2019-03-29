
# Typescript编译配置
> 本篇主要实现`rollup`官方的`Typescript`配置

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

## 安装 rollup.js 编译 Typescript 代码的插件模块
yarn add -D rollup-plugin-typescript typescript tslib
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
const typescript = require('rollup-plugin-typescript');

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
        'dist':resolve('src/index.ts'),
    },
    experimentalCodeSplitting:true,
    output:{
        format: 'iife', // iife  AMD
        dir: 'dist',
        name: 'TSDome',
    },
    plugins: [
        NodeResolve(),
        commonjs(),
        // babel({
        //     runtimeHelpers: true,
        //     exclude: 'node_modules/**' // 只编译我们的源代码
        // }),
        typescript(),
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

- 源码路径`./src/index.ts`
- 源码内容
```
import delay from "./lib/delay";

async function dll(n: number) {
  while (--n) {
    await delay({
      interval: 10,
      num: greeter(n),
    });
  }
}

function greeter(person: any) {
  return person * 2;
}

export default dll(100);

```
- 源码路径`./src/lib/delay.ts`
- 源码内容
```
import { Person } from "../interface/Delay";
const delay = (maka: Person) => {
    return new Promise((resolve, reject) => setTimeout(() => {
        console.log(maka.num, maka.arr);
        resolve();
    }, maka.interval));
};
export default delay;

```

- 源码路径`./src/interface/Delay.ts`
- 源码内容
```
interface Person {
  interval: number;
  num: number;
}

export { Person };
```

## 编译结果

- 在dome目录下运行 `yarn run dev `
- 编译结果就在目录 `./dist/` 下
  - ES5代码文件`./dist/dist.js`
- 插件本地服务启动，效果如下：
```
rollup v1.4.1
bundles /Users/sean/work/MyGitHhub/simpleRollup/dome/course_08/src/index.ts → dist...
http://localhost:3011 -> /Users/sean/work/MyGitHhub/simpleRollup/dome/course_08/view
http://localhost:3011 -> /Users/sean/work/MyGitHhub/simpleRollup/dome/course_08/dist
created dist in 222ms

[2019-03-29 15:03:02] waiting for changes...

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
    <h1>This is course08</h1>
    <section>/(ﾟ▽ﾟ)/</section>
    <script src="./dist.js"></script>

</body>

</html>

```
-  访问`http://localhost:3011`
-  可随意修改页面样式


## 记录  

主要讲述是，`rollup.js`编译`typescript`文件的配置，rollup的学习也基本告一段落了！ 撒花~