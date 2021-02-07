const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const DirectoryNamedPlugin = require("directory-named-webpack-plugin");
const FontMinPlugin = require('fontmin-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (env, args) => {
    let isProd = args.mode === 'production',
        outputPath = path.resolve(__dirname, 'dist/' + (isProd ? 'prod' : 'dev')) + '/',
        srcPath = path.resolve(__dirname, 'src') + '/';

    return {
        mode: args.mode,
        entry: srcPath + 'index.js',
        optimization: {
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendor',
                        reuseExistingChunk: true,
                        enforce: true
                    }
                }
            },
            minimizer: [new TerserPlugin({
                extractComments: () => false
            })]
        },
        output: {
            filename: '[name].js',
            path: outputPath,
            publicPath: ''
        },
        resolve: {
            modules: ['node_modules', 'src'],
            plugins: [
                new DirectoryNamedPlugin(true)
            ]
        },
        devServer: {
            contentBase: srcPath,
            host: '0.0.0.0',
            port: 3000,
            historyApiFallback: true,
            allowedHosts: [
                'dev.loc'
            ],
            proxy: {
                '/api/*': {
                    target: 'http://localhost:80',
                    pathRewrite: {
                        '^/api/': 'tech-tasks/src/api/index.php/'
                    }
                },
                '/static/*': {
                    target: 'http://localhost:80',
                    pathRewrite: {
                        '^/static/': 'tech-tasks/src/static/'
                    }
                }
            }
        },
        module: {
            rules: [{
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        only: ['src'],
                        presets: [
                            ['@babel/preset-react', {
                                pragma: 'Core.createElement',
                                pragmaFrag: 'Core.Fragment'
                            }]
                        ],
                        plugins: [
                            ['@babel/plugin-proposal-decorators', {
                                legacy: true
                            }]
                        ]
                    }
                }
            }, {
                test: /\.scss$/,
                use: [(
                    isProd ? MiniCssExtractPlugin.loader : {
                        loader: 'style-loader'
                    }
                ), {
                    loader: 'css-loader'
                }, {
                    loader: 'sass-loader',
                    options: {
                        additionalData: '@import "src/vars.scss";'
                    }
                }].filter(i => i)
            }, {
                test: /\.(eot|woff|woff2|ttf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'static/font/[name].[ext]'
                    }
                }
            }]
        },
        plugins: [
            new HtmlPlugin({
                template: srcPath + 'index.html'
            })
        ].concat(isProd ? [
            new FontMinPlugin({
                autodetect: true
            }),
            new MiniCssExtractPlugin({
                filename: 'style.css'
            }),
            new CopyPlugin({
                patterns: [{
                    from: 'src/static',
                    to: 'static',
                    filter: resourcePath => (
                        resourcePath.indexOf(srcPath + 'static/font/') !== 0
                    )
                }]
            })
        ] : [])
    }
};