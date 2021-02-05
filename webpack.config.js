const path = require('path');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src/js/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCSSExtractPlugin.loader
                    },
                    'css-loader',
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Plugins',
            template: path.resolve(__dirname, 'src/index.html')
        }),
        new MiniCSSExtractPlugin({
            filename: 'css/[name].css'
        })
    ]
}