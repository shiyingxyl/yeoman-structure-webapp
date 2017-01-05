const webpack = require('webpack');
const conf = require('./gulp.conf');
const path = require('path');
const constants = require('../constants.js');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');
const commonsPlugin = new webpack.optimize.CommonsChunkPlugin( {
    name: 'common'
    // chunks: ['index']
});
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack-base.conf');
module.exports = merge(baseWebpackConfig, {
    debug: true,
    devtool: 'source-map',
    // devtool: 'eval-source-map',
    entry: {
        common: [
            'jquery',
            'f7/js/framework7.js',
            'f7/css/framework7.ios.css',
            'f7/css/framework7.ios.colors.css'
        ],
        'index': [
            'webpack/hot/dev-server',
            'webpack-hot-middleware/client',
            // 'webpack-hot-middleware/client?noInfo=true&reload=true',
            `./${conf.path.src('index')}`
        ]
    },
    output: {
        path: path.join(process.cwd(), conf.paths.tmp),
        // publicPath: '/icm/dist/',
        filename: "[name].js"
        /*
         * The filename of non-entry chunks as relative path inside the output.path directory.
         * （按需加载模块时输出的文件名称）
         * 适用于单页面程序
         * */
        ,chunkFilename: '[name]-[chunkhash:8].chunk.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"dev"',
            __DEVAPI__: "/devApi/"
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        commonsPlugin,
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
        /*
         * Search for equal or similar files and deduplicate them in the output
         * （删除重复依赖的文件）
         */
        // new webpack.optimize.DedupePlugin(),
        // new webpack.ResolverPlugin([
        //     new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        // ], ["normal", "loader"]),
        new HtmlWebpackPlugin({
            template: conf.path.src('index.jade'),
            inject: true,
            cache: false,
            hash: true,
            minify: false,
            // 根据依赖自动排序
            chunksSortMode: 'dependency'
        }),
        /*
         * extract css
         * （提取css文件到单独的文件中）
         */
        // new ExtractTextPlugin(devServer ? "css/[name].css" : "css/[name]-[chunkhash:8].css", {allChunks: true}),
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
});
