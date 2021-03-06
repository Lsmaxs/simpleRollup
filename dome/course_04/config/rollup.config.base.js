const path = require('path');
const NodeResolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const babel = require('rollup-plugin-babel')
// import NodeResolve from 'rollup-plugin-node-resolve';
// import commonjs from 'rollup-plugin-commonjs';
// import babel from 'rollup-plugin-babel';

const resolve = function (filePath) {
    return path.resolve(__dirname, "../", filePath)
}

module.exports = {
    input: resolve('src/index.js'),
    output: {
        file: resolve('dist/dist.js'),
        format: 'umd', // iife  AMD
    },
    plugins: [
        NodeResolve(),
        commonjs(),
        babel({
            runtimeHelpers: true,
            exclude: 'node_modules/**' // 只编译我们的源代码
        }),
       
    ],
    
}