const path = require('path');
const Uglify = require('rollup-plugin-uglify')
// import { uglify}  from 'rollup-plugin-uglify';
const baseConfig = require('./rollup.config.base');

const resolve = function (filePath) {
    return path.resolve(__dirname, "../", filePath)
}

baseConfig.map((config, index) => {
    config.output.sourcemap = false;
    config.plugins = [
        ...config.plugins,
        Uglify.uglify()
    ]
    return config;
  })

module.exports = baseConfig