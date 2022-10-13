import { app } from 'electron'
import fs from 'fs'
import path from "path"
import { EventEmitter } from 'stream'
import { DefaultValues } from "../common/SettingsItems"

const settingsFileName = "settings.json"

const settingsFilePath = path.join(app.getPath("userData"), settingsFileName)

const file = fs.readFileSync(settingsFilePath, { flag: "a+" })
let data

try {
    data = JSON.parse(file.toString())
} catch (e) {
    data = { ...DefaultValues }
    fs.writeFileSync(settingsFilePath, JSON.stringify(data))
}

const settingsChangeEmitter = new EventEmitter()

const getSettingValue = (setting) => data[setting]

const setSettingValue = (setting, value) => {
    data[setting] = value
    fs.writeFileSync(settingsFilePath, JSON.stringify(data))
    settingsChangeEmitter.emit(setting, value)
}

export { getSettingValue, setSettingValue, settingsChangeEmitter }
