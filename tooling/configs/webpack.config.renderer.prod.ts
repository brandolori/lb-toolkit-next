import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import { merge } from 'webpack-merge'
import TerserPlugin from 'terser-webpack-plugin'
import baseConfig from './webpack.config.base'
import webpackPaths from './webpack.paths'

const configuration: webpack.Configuration = {
    mode: 'production',

    target: ['web', 'electron-renderer'],

    entry: [path.join(webpackPaths.srcRendererPath, 'index.tsx')],

    output: {
        path: webpackPaths.distRendererPath,
        publicPath: './',
        filename: 'renderer.js',
        library: {
            type: 'umd',
        },
    },

    module: {
        rules: [
            {
                test: /\.s?(a|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                        },
                    },
                    'sass-loader',
                ],
                include: /\.module\.s?(c|a)ss$/,
            },
            {
                test: /\.s?(a|c)ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
                exclude: /\.module\.s?(c|a)ss$/,
            },
            // Fonts
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            // Images
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            // SVG
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: '@svgr/webpack',
                        options: {
                            prettier: false,
                            svgo: false,
                            svgoConfig: {
                                plugins: [{ removeViewBox: false }],
                            },
                            titleProp: true,
                            ref: true,
                        },
                    },
                    'file-loader',
                ],
            },
        ],
    },

    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    compress: {
                        // weird things with React
                        // booleans_as_integers: true,
                        drop_console: true,
                        ecma: 2020,
                        keep_fargs: false,
                        passes: 5,
                        toplevel: true,
                    }
                }
            }),
            new CssMinimizerPlugin(),
        ],
    },

    plugins: [

        new webpack.EnvironmentPlugin({
            NODE_ENV: 'production',
            DEBUG_PROD: false,
        }),

        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(webpackPaths.srcRendererPath, 'index.ejs'),
            minify: {
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeComments: true,
            },
            isBrowser: false,
            isDevelopment: process.env.NODE_ENV !== 'production',
        }),

        new webpack.DefinePlugin({
            'process.type': '"renderer"',
        }),
    ],
}

export default merge(baseConfig, configuration)
