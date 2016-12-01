var webpack = require('webpack');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    entry: {
        // bootstrap angular2 application
        'app': './client/main.ts'
    },

    resolve: {
        // import tag without extension
        extensions: ['.js', '.ts']
    },

    resolveLoader: {
        moduleExtensions: ['-loader']
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: [
                    'awesome-typescript-loader',
                    'angular2-template-loader',
                    'angular2-router-loader'
                ]
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.css$/,
                loader: 'raw'
            }
        ]
    },

    plugins: [
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            './src' // location of your src
        ),
        new BrowserSyncPlugin({
            // browse to http://localhost:3000/ during development, 
            // ./public directory is being served 
            host: 'localhost',
            port: 3001,
            proxy: 'http://localhost:3000/'
        })
    ]
};