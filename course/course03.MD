
# 开发模式配置
> 正常开发项目编译主要有两种模式 开发模式 和 生产模式 两种甚至更多种情况。现在介绍下`rollup.js`下配置开发模式。

## 实现功能
- 编译ES6+代码
- 编译成umd格式(通用模块定义)
- 本地开发的HTTP服务启动
- 生成开发调试的sourceMap文件

## 依赖安装

```
## 基础模块
yarn add -D rollup 

## 编译ES6新特征的其他模块
yarn add -D @babel/core @babel/preset-env @babel/polyfill  @babel/runtime @babel/plugin-transform-runtime rollup-plugin-commonjs  rollup-plugin-node-resolve

## 安装 rollup.js 编译本地开发服务插件
yarn add -D --save-dev rollup-plugin-serve
```

- `rollup` 模块是`rollup`编译的核心模块
- `rollup-plugin-commonjs` 模块支持`Node.js`里面的`CommonJS`模块转为ES6模块
- `rollup-plugin-node-resolve` 告诉`rollup`如何查找外部模块

## rollup打包配置  

- 编译的配置文件路径 `./config/rollup.config.js`
- 编译文件内容
```
const path = require('path');
import babel from 'rollup-plugin-babel';
import NodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import serves from 'rollup-plugin-serve';

const resolve = function (filePath) {
    return path.resolve(__dirname, "../", filePath)
}

module.exports = {
    input: resolve('src/index.js'),
    output: {
        file: resolve('dist/dist.js'),
        format: 'umd', // iife  AMD
        sourcemap: true // 开启sourcemap文件生成
    },
    plugins: [
        NodeResolve(),
        commonjs(),
        babel({
            runtimeHelpers: true,
            exclude: 'node_modules/**' // 只编译我们的源代码
        }),
        serves({
            port: 3011,
            // 设置 view的访问目录和dist的访问目录
            contentBase: [resolve('view'), resolve('dist')]  
        })
    ],
    
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

## 编译结果

- 在dome目录下运行 `yarn run dev `
- 编译结果就在目录 `./dist/` 下
  - ES5代码文件`./dist/dist.js`
  - 源码的sourceMap 文件 `./dist/dist.js.map`
- 插件本地服务启动，效果如下：
```
> rollup@1.0.0 dev /Users/sean/work/MyGitHhub/simpleRollup/dome/course_03
> rollup -c ./config/rollup.config.js


/Users/sean/work/MyGitHhub/simpleRollup/dome/course_03/src/index.js → dist/dist.js...
http://localhost:3011 -> /Users/sean/work/MyGitHhub/simpleRollup/dome/course_03/view
http://localhost:3011 -> /Users/sean/work/MyGitHhub/simpleRollup/dome/course_03/dist
created dist/dist.js in 600ms
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
    <h1>This is course03</h1>
    <section>(ﾟ▽ﾟ)/</section>
    <!-- 注意  由于上面dist目录被编译到内存根路径 因此没有了/dist/ -->
    <script src="./dist.js"></script>

</body>

</html>

```
-  访问`http://localhost:3011`
-  打开工作台console会显示`dist.js`运行结果
```
▽ {vv: 1, bb: 2}
  bb: 2
  vv: 1
▽ __proto__: Object

```


## 记录  

主要讲述是，`rollup.js`在开发模式的使用流程，后面会是`rollup.js`的生产模式，也就是正式发布上线时候的开发配置。

