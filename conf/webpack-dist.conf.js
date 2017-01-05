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
    entry: {
        common: [
            'jquery',
            'f7/js/framework7.js',
            'f7/css/framework7.ios.css',
            'f7/css/framework7.ios.colors.css'
        ],
        'index': [
            `./${conf.path.src('index')}`
        ]
    },
    output: {
        path: path.join(process.cwd(), conf.paths.dist),
        // publicPath: '/icm/dist/',
        filename: "[name]-[hash].js"
        /*
         * The filename of non-entry chunks as relative path inside the output.path directory.
         * （按需加载模块时输出的文件名称）
         * */
        ,chunkFilename: '[name]-[chunkhash:8].chunk.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"prd"',
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
            // chunks: ['common', 'index'],
            inject: true,
            // cache: false,
            // hash: true,
            // 根据依赖自动排序
            chunksSortMode: 'dependency'
        }),

        new webpack.optimize.UglifyJsPlugin({
            compress: {unused: true, dead_code: true} // eslint-disable-line camelcase
        }),
        /*
         * extract css
         * （提取css文件到单独的文件中）
         */
        // new ExtractTextPlugin(devServer ? "css/[name].css" : "css/[name]-[chunkhash:8].css", {allChunks: true}),
        new ExtractTextPlugin({
            filename: '[name]-[contenthash].css',
            allChunks: true
        })
    ],
});
