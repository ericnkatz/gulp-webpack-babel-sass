var webpack = require('webpack');

module.exports = {
    entry: {
        app: ['./src/js/app.js']
    },
    output: {
    	publicPath: 'dist',
        filename: '[name].bundle.js',
    },
    module: {
        loaders: [
            { test: /\.js$/, loaders: ['babel'], exclude: /node_modules/ },
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin() // uglify the js
    ]
};