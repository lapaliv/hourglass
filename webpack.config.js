var path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    resolve: {
        extensions: ['.js'],
        alias: {
            'src': path.resolve(__dirname, 'src')
        },
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'hourglass.min.js',
        libraryTarget: 'umd'
    },
    module: {
        rules: [{
            // Include ts, tsx, js, and jsx files.
            test: /\.(ts|js)x?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }],
    },
    target: 'node',
};
