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

const plugins =  [
    NodeResolve(),
    commonjs(),
    babel({
        runtimeHelpers: true,
        exclude: 'node_modules/**' // 只编译我们的源代码
    })
]

module.exports = [
    {
      input: resolve('src/index.js'),
      output: {
        file: resolve('dist/index.js'),
        format: 'umd',
        name: 'Demo',
      }, 
      external: ['lib/hello', 'lib/world'],
      plugins,
    },
  
    {
      input: resolve('src/lib/hello.js'),
      output: {
        file: resolve('dist/lib/hello.js'),
        format: 'umd',
        name: 'Hello',
      }, 
      plugins,
    },
  
    {
      input: resolve('src/lib/world.js'),
      output: {
        file: resolve('dist/lib/world.js'),
        format: 'umd',
        name: 'World',
      }, 
      plugins,
    },
  
  
  ]