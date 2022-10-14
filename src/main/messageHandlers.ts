import { ipcMain, app, shell } from "electron"
import getWifiPassword from "./getWifiPassword"
import getWifiSSID from "./getWifiSSID"
import { getHypervisor, setHypervisor } from "./hypervisor"
import { getSettingValue, setSettingValue } from "./settings"
import { getAssetPath, handleCommand } from "../common/utils"
import sudo from 'sudo-prompt'
import emptyTrash from "empty-trash"

export default () => {
    ipcMain.handle('cmd:fetchUpdates', async () => {

        const stdout = await handleCommand("winget", ["upgrade", "--include-unknown"]) as string
        return stdout.substring(stdout.indexOf("Nome"))

    })

    ipcMain.handle('cmd:updatePackage', async (ev, packageName) => {
        const stdout = await handleCommand("winget", ["upgrade", packageName])
        return stdout

    })

    ipcMain.handle('cmd:retrieveHypervisorState', async () => {
        return await getHypervisor()
    })

    ipcMain.handle('cmd:executeHypervisorCommand', async (ev, value) => {
        return await setHypervisor(value)
    })

    ipcMain.handle('settings:getSettingValue', (ev, setting) => {
        return getSettingValue(setting)
    })

    ipcMain.handle('settings:setSettingValue', (ev, setting, value) => {
        return setSettingValue(setting, value)
    })

    ipcMain.handle('fs:appGetPath', async (ev, name) => {
        return app.getPath(name)
    })


    ipcMain.handle('fs:calculateFolderSize', async (ev, path) => {
        return new Promise((res, rej) => {
            sudo.exec(`powershell -noprofile -command "(ls ${path} -r | measure -sum Length).Sum"`,
                { name: "lbtoolkit" },
                (error, stdout) => {
                    if (error)
                        rej(error.message)

                    const number = (Number.parseInt(stdout.toString()) / 1_000_000)
                    res(Number.isNaN(number) ? 0 : number)
                })
        })
    })

    ipcMain.handle('fs:getEnvironmentVariable', async (ev, variable) => {
        return process.env[variable]
    })

    ipcMain.handle('fs:deleteFolder', async (ev, path) => {

        // special case for the recycle bin: it's not a real folder
        if (path == "shell:RecycleBinFolder") {
            return emptyTrash()
        }

        return new Promise<void>((res, rej) => {
            sudo.exec(`powershell -noprofile -command "Get-ChildItem ${path} | Remove-Item –recurse -Force"`,
                { name: "lbtoolkit" },
                (error) => {
                    if (error)
                        rej(error.message)
                    res()
                })
        })
    })

    ipcMain.on("fs:openFolder", async (ev, path) => {

        // special case for the recycle bin: it's not a real folder
        if (path == "shell:RecycleBinFolder") {
            await handleCommand("explorer", ["shell:RecycleBinFolder"])
        }

        shell.showItemInFolder(path)
    })

    ipcMain.handle('wifi:retrieveConnectionDetails', async () => {
        const ssid = await getWifiSSID()
        const password = await getWifiPassword(ssid)

        return { ssid, password }
    })

    ipcMain.handle('display:currentRefreshRate', async () => {
        const stdout = await handleCommand(getAssetPath("bin\\refreshtool\\refreshtool.exe"), ["current"])
        return stdout.replace("\r\n", "")
    })

    ipcMain.handle('display:listRefreshRates', async () => {
        const stdout = await handleCommand(getAssetPath("bin\\refreshtool\\refreshtool.exe"), ["list"])
        return stdout.split("\r\n").filter(el => el != "")
    })

    ipcMain.handle('display:setRefreshRate', async (ev, value) => {
        const stdout = await handleCommand(getAssetPath("bin\\refreshtool\\refreshtool.exe"), ["change", value])
    })


    ipcMain.handle('app:getVersion', async () => {
        return app.getVersion()
    })

}