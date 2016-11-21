/**
 * Created by GG on 2016/10/13.
 */

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // devtool: 'eval-source-map',

    entry: "./src/main.js",
    output: {
        path: "./build",
        filename: "[name].js"
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            }
        ]
    },

    plugins: [
        new webpack.BannerPlugin("Copyright GG inc."),
        new HtmlWebpackPlugin({template: "./src/index.html"})
    ],

    devServer: {
        contentBase: "./build",//本地服务器所加载的页面所在的目录
        colors: true,//终端中输出结果为彩色
        historyApiFallback: true,//不跳转
        inline: true //实时刷新
    }
};