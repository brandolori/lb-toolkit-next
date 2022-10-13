import { app } from 'electron'
import fs from 'fs'
import path from "path"
import { EventEmitter } from 'stream'
import { DefaultValues, Settings } from "../common/SettingsItems"

const settingsFileName = "settings.json"

const settingsFilePath = path.join(app.getPath("userData"), settingsFileName)

const file = fs.readFileSync(settingsFilePath, { flag: "a+" })
let data: Settings

try {
    data = JSON.parse(file.toString()) as Settings
} catch (e) {
    data = { ...DefaultValues }
    fs.writeFileSync(settingsFilePath, JSON.stringify(data))
}

type SettingsEventEmitter = {
    on: (key: keyof Settings, callback: (value: any) => void) => void
    emit: (key: keyof Settings, value: any) => void
}

const settingsChangeEmitter = new EventEmitter() as SettingsEventEmitter

const getSettingValue = <T extends keyof Settings>(setting: T): Settings[T] => data[setting]

const setSettingValue = <T extends keyof Settings>(setting: T, value: Settings[T]) => {
    data[setting] = value
    fs.writeFileSync(settingsFilePath, JSON.stringify(data))
    settingsChangeEmitter.emit(setting, value)
}

export { getSettingValue, setSettingValue, settingsChangeEmitter }
