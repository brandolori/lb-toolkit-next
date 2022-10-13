import path from 'path'
import { unregisterAtLogin, registerAtLogin } from './login'
import { setSettingValue } from './settings'
import { spawn } from 'child_process'
import { app } from 'electron'

const run = (args, done) => {
    const updateExe = path.resolve(path.dirname(process.execPath), '..', 'Update.exe')
    spawn(updateExe, args, {
        detached: true
    }).on('close', done)
}

const isSquirrel = () => {
    if (process.platform === 'win32') {
        const cmd = process.argv[1]
        const target = path.basename(process.execPath)

        if (cmd === '--squirrel-install' || cmd === '--squirrel-updated') {
            run(['--createShortcut=' + target + ''], app.quit)
            registerAtLogin()
            setSettingValue("enableRunOnLogin", true)
            return true
        }
        if (cmd === '--squirrel-uninstall') {
            run(['--removeShortcut=' + target + ''], app.quit)
            unregisterAtLogin()
            return true
        }
        if (cmd === '--squirrel-obsolete') {
            app.quit()
            return true
        }
    }
    return false
}

export { isSquirrel }
