const path = require('path');
import { uglify}  from 'rollup-plugin-uglify';
const  baseConfig = require('./rollup.config.base');

const resolve = function (filePath) {
    return path.resolve(__dirname, "../", filePath)
}

baseConfig.output.sourcemap = false;

baseConfig.plugins = [
    ...baseConfig.plugins,
    uglify()
]

module.exports = baseConfig