var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.config.common.js');

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',

    output: {
        path: './public/js/app',
        filename: 'bundle.js',
        publicPath: '/js/app/', // where compile code lives
        chunkFilename: '[id].chunk.js'
    }
});