import 'webpack-dev-server'
import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { merge } from 'webpack-merge'
import { spawn } from 'child_process'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import baseConfig from './webpack.config.base'
import webpackPaths from './webpack.paths'

const port = process.env.PORT || 1212

const configuration: webpack.Configuration = {
    devtool: 'inline-source-map',

    mode: 'development',

    target: ['web', 'electron-renderer'],

    entry: [
        `webpack-dev-server/client?http://localhost:${port}/dist`,
        'webpack/hot/only-dev-server',
        path.join(webpackPaths.srcRendererPath, 'index.tsx'),
    ],

    output: {
        path: webpackPaths.distRendererPath,
        publicPath: '/',
        filename: 'renderer.dev.js',
        library: {
            type: 'umd',
        },
    },

    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    'style-loader',
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
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
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
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),

        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development',
        }),

        new webpack.LoaderOptionsPlugin({
            debug: true,
        }),

        new ReactRefreshWebpackPlugin(),

        new HtmlWebpackPlugin({
            filename: path.join('index.html'),
            template: path.join(webpackPaths.srcRendererPath, 'index.ejs'),
            minify: {
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeComments: true,
            },
            isBrowser: false,
            env: process.env.NODE_ENV,
            isDevelopment: process.env.NODE_ENV !== 'production',
            nodeModules: webpackPaths.appNodeModulesPath,
        }),
    ],

    node: {
        __dirname: false,
        __filename: false,
    },

    devServer: {
        port,
        compress: true,
        hot: true,
        headers: { 'Access-Control-Allow-Origin': '*' },
        static: {
            publicPath: '/',
        },
        historyApiFallback: {
            verbose: true,
        },
        setupMiddlewares(middlewares) {
            console.log('Starting preload.js builder...')

            //spawn preload process
            spawn('npm', ['run', 'start:preload'], {
                shell: true,
                stdio: 'inherit',
            })
                .on('close', (code: number) => process.exit(code!))
                .on('error', (spawnError) => console.error(spawnError))

            //spawn main process
            spawn('npm', ['run', 'start:main'], {
                shell: true,
                stdio: 'inherit',
            })
                .on('close', (code: number) => process.exit(code!))
                .on('error', (spawnError) => console.error(spawnError))

            return middlewares
        },
    },
}

export default merge(baseConfig, configuration)
