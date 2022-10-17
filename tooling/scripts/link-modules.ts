import fs from 'fs'
import { join } from 'path'
import webpackPaths from '../configs/webpack.paths'

const { srcNodeModulesPath } = webpackPaths
const { appNodeModulesPath } = webpackPaths

const devbuildsNodeModulesPath = join(__dirname, "..\\devbuilds\\node_modules")

if (!fs.existsSync(srcNodeModulesPath) && fs.existsSync(appNodeModulesPath)) {
    fs.symlinkSync(appNodeModulesPath, srcNodeModulesPath, 'junction')
}
if (!fs.existsSync(devbuildsNodeModulesPath) && fs.existsSync(appNodeModulesPath)) {
    fs.symlinkSync(appNodeModulesPath, devbuildsNodeModulesPath, 'junction')
}
