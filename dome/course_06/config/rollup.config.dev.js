const path = require('path');
const serves = require('rollup-plugin-serve');
const baseConfig = require('./rollup.config.base');

const resolve = function (filePath) {
    return path.resolve(__dirname, "../", filePath)
}

baseConfig.map((config, index) => {
    config.output.sourcemap = true;
    return config;
})


module.exports = baseConfig