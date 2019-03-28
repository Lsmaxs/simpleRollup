const path = require('path');
const NodeResolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
// const babel = require('rollup-plugin-babel')
const postcss = require('rollup-plugin-postcss');
const sass = require('node-sass');
const typescript = require('rollup-plugin-typescript');
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