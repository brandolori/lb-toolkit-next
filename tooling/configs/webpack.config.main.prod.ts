import path from 'path'
import webpack from 'webpack'
import { merge } from 'webpack-merge'
import TerserPlugin from 'terser-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import baseConfig from './webpack.config.base'
import webpackPaths from './webpack.paths'
import deleteSourceMaps from '../scripts/delete-source-maps'

deleteSourceMaps()

const configuration: webpack.Configuration = {
    devtool: 'source-map',

    mode: 'production',

    target: 'electron-main',

    entry: {
        main: path.join(webpackPaths.srcMainPath, 'main.ts'),
        preload: path.join(webpackPaths.srcMainPath, 'preload.ts'),
    },

    output: {
        path: webpackPaths.distMainPath,
        filename: '[name].js',
    },

    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true,
            }),
        ],
    },

    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: process.env.ANALYZE === 'true' ? 'server' : 'disabled',
        }),
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
