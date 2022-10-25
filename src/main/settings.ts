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
    data = JSON.parse(file.toString())
} catch (e) {
    data = { ...DefaultValues }
    fs.writeFileSync(settingsFilePath, JSON.stringify(data))
}

type SettingsEventEmitter = {
    on: <T extends keyof Settings>(key: T, callback: (value: Settings[T]) => void) => void
    emit: <T extends keyof Settings>(key: T, value: Settings[T]) => void
}

const settingsChangeEmitter = new EventEmitter() as SettingsEventEmitter

const getSettingValue = <T extends keyof Settings>(setting: T): Settings[T] => data[setting]

const setSettingValue = <T extends keyof Settings>(setting: T, value: Settings[T]) => {
    data[setting] = value
    fs.writeFileSync(settingsFilePath, JSON.stringify(data))
    settingsChangeEmitter.emit(setting, value)
}

export { getSettingValue, setSettingValue, settingsChangeEmitter }
