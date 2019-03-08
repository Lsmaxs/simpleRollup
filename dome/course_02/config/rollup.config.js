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
            runtimeHelpers: true,
            exclude: 'node_modules/**' // 只编译我们的源代码
        })
     ]
}