import { Settings } from 'common/SettingsItems'
import { contextBridge, ipcRenderer } from 'electron'
import { Clip } from './clipboard'

// https://www.electronjs.org/docs/latest/tutorial/process-model
// https://www.electronjs.org/docs/latest/tutorial/sandbox
// while sandboxing, we only have access to limited apis,
// and no general-purpose require()

// require("./test")

const additions = {
    fetchUpdates: () => ipcRenderer.invoke('cmd:fetchUpdates'),
    updatePackage: (packageName: string) => ipcRenderer.invoke('cmd:updatePackage', packageName),
    retrieveHypervisorState: () => ipcRenderer.invoke('cmd:retrieveHypervisorState'),
    executeHypervisorCommand: (state: boolean) => ipcRenderer.invoke('cmd:executeHypervisorCommand', state),

    currentRefreshRate: () => ipcRenderer.invoke('display:currentRefreshRate'),
    listRefreshRates: () => ipcRenderer.invoke('display:listRefreshRates'),
    setRefreshRate: (refresh: string) => ipcRenderer.invoke('display:setRefreshRate', refresh),

    calculateFolderSize: (path: string) => ipcRenderer.invoke("fs:calculateFolderSize", path),
    getEnvironmentVariable: (variable: string) => ipcRenderer.invoke("fs:getEnvironmentVariable", variable),
    appGetPath: (name: string) => ipcRenderer.invoke("fs:appGetPath", name),
    deleteFolder: (path: string) => ipcRenderer.invoke("fs:deleteFolder", path),
    openFolder: (path: string) => ipcRenderer.send("fs:openFolder", path),
    openUrl: (url: string) => ipcRenderer.send("fs:openUrl", url),

    getSettingValue: (setting: keyof Settings) => ipcRenderer.invoke("settings:getSettingValue", setting),
    setSettingValue: <T extends keyof Settings>(setting: T, value: Settings[T]) => ipcRenderer.invoke("settings:setSettingValue", setting, value),

    readyToShow: () => ipcRenderer.send('render:readyToShow'),
    appGetVersion: () => ipcRenderer.invoke("app:getVersion"),

    retrieveConnectionDetails: () => ipcRenderer.invoke('wifi:retrieveConnectionDetails'),

    handleClipboardChange: (callback: () => void) => {
        ipcRenderer.removeAllListeners("clipboard:change")
        ipcRenderer.on('clipboard:change', callback)
    },
    clipboardPaste: (text: string) => ipcRenderer.send("clipboard:paste", text),
    fetchClips: (filter: string): Promise<Clip[]> => ipcRenderer.invoke('clipboard:fetchClips', filter),
}

declare global {
    interface Window {
        electronAPI: typeof additions
    }
}


contextBridge.exposeInMainWorld('electronAPI', additions)