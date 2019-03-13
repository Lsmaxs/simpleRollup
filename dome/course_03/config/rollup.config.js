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
            contentBase: [resolve('view'), resolve('dist')]  // 设置 view的访问目录和dist的访问目录
        })
    ],
    
}