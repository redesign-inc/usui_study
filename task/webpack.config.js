const config = require('./config');
const del = require('del');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = async ()=>{
    await del(config.js.dest);

    const dropConsole = ( config.mode == 'production' )? true : false;
    const webpackConfig = {
        cache: true,
        watch: false,
        mode: 'production',
        entry: config.js.entry,
        output: {
            path: config.js.dest,
            filename: '[name].js'
        },
        experiments: {
            topLevelAwait: true
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                // ★ ここから追加：CSS処理用ローダーの設定
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader'
                    ]
                },
                // ★ ここまで追加
                {
                    test: /\.js$/,
                    exclude: /node_modules\/(?!(dom7|ssr-window|swiper)\/).*/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    ['@babel/preset-env', {
                                        useBuiltIns: 'usage',
                                        corejs: 3
                                    }]
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    parallel: true,
                    extractComments: false,
                    // terserOptions: {
                    //  compress: {
                    //      drop_console: dropConsole
                    //  }
                    // }
                })
            ]
        },
        resolve: {
            extensions: ['.js', '.vue', '.json']
        },
        plugins: [
            new VueLoaderPlugin()
        ],
        performance: {
            hints: false
        }
    };

    if( config.mode != 'production' ) {
        webpackConfig.devtool = 'inline-source-map';
    }

    return webpackConfig;
};