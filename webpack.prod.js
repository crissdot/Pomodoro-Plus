const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');


module.exports = merge(common, {
    mode: 'production',
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
            },
            {
                test: /\.png$/i,
                loader: 'file-loader',
                options: {
                    name: '[name].png',
                    outputPath: 'images'
                }
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [new CssMinimizerPlugin()],
    },
    plugins: [
        new MiniCSSExtractPlugin({
            filename: 'css/styles.css'
        })
    ]
});
