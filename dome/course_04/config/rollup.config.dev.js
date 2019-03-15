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