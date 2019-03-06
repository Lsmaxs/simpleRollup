const path = require('path');

const resolve =  function (filePath){
    return path.resolve(__dirname,"../",filePath)
}


module.exports = {
    input: resolve('src/index.js'),
    output: {
        file: resolve('dist/dist.js'),
        format: 'AMD'
    }
}