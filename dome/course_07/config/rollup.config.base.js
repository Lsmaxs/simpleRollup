const path = require('path');
const NodeResolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const babel = require('rollup-plugin-babel')
const postcss = require('rollup-plugin-postcss');
const sass = require('node-sass');
// import NodeResolve from 'rollup-plugin-node-resolve';
// import commonjs from 'rollup-plugin-commonjs';
// import babel from 'rollup-plugin-babel';
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