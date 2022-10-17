import fs from 'fs'
import { join } from 'path'
import webpackPaths from '../configs/webpack.paths'

const { srcNodeModulesPath } = webpackPaths
const { appNodeModulesPath } = webpackPaths

const devBuildsPath = join(__dirname, "..\\devbuilds")

const devbuildsNodeModulesPath = join(devBuildsPath, "node_modules")

if (!fs.existsSync(srcNodeModulesPath) && fs.existsSync(appNodeModulesPath)) {
    fs.symlinkSync(appNodeModulesPath, srcNodeModulesPath, 'junction')
}
if (!fs.existsSync(devbuildsNodeModulesPath) && fs.existsSync(appNodeModulesPath)) {
    if (!fs.existsSync(devBuildsPath)) {
        fs.mkdirSync(devBuildsPath)
    }
    fs.symlinkSync(appNodeModulesPath, devbuildsNodeModulesPath, 'junction')
}
