const path = require('path');
const json = require('rollup-plugin-json');
const buble = require('rollup-plugin-buble');

const resolve =  function (filePath){
    return path.resolve(__dirname,"../",filePath)
}

module.exports = {
    input: resolve('src/index.js'),
    output: {
        file: resolve('dist/dist.js'),
        format: 'iife' // iife  cjs
    },
    plugins: [ json(), buble() ]
}