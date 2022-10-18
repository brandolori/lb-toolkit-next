import path from 'path'
import webpack from 'webpack'
import { merge } from 'webpack-merge'
import TerserPlugin from 'terser-webpack-plugin'
import baseConfig from './webpack.config.base'
import webpackPaths from './webpack.paths'

const configuration: webpack.Configuration = {
    mode: 'production',

    target: 'electron-main',

    entry: {
        main: path.join(webpackPaths.srcMainPath, 'main.ts'),
        preload: path.join(webpackPaths.srcMainPath, 'preload.ts'),
    },

    output: {
        path: webpackPaths.distMainPath,
        filename: '[name].js',
        library: {
            type: 'umd',
        },
    },

    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    compress: {
                        // crashes squirrel
                        // booleans_as_integers: true,
                        drop_console: true,
                        ecma: 2020,
                        keep_fargs: false,
                        passes: 5,
                        toplevel: true,
                    }
                }
            }),
        ],
    },

    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'production',
            DEBUG_PROD: false,
            START_MINIMIZED: false,
        }),

        new webpack.DefinePlugin({
            'process.type': '"main"',
        }),
    ],

    node: {
        __dirname: false,
        __filename: false,
    },
}

export default merge(baseConfig, configuration)
