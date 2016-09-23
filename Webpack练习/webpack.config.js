/**
 * Created by GG on 16/9/21.
 */
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    //devtool: 'eval-source-map',

    entry: "./app/main.js",
    output: {
        path: "./build",
        filename: "[name].js"
    },

    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: "json"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css?modules!postcss')
            },
            {
                test: /\.(png)|(jpg)$/,
                loader: "url?limit=20000"
            }
        ]
    },

    postcss: [
        require('autoprefixer')//调用autoprefixer插件
    ],

    plugins: [
        new webpack.BannerPlugin("Copyright GG inc."),
        new HtmlWebpackPlugin({template: "./app/index.html"}),
        new ExtractTextPlugin("[name].css")
    ],

    devServer: {
        contentBase: "./build",//本地服务器所加载的页面所在的目录
        colors: true,//终端中输出结果为彩色
        historyApiFallback: true,//不跳转
        inline: true //实时刷新
    }
};