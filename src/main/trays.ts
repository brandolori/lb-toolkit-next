import { Tray, Menu, app } from "electron"
import path from "path"
import robot from "robotjs"

let next: Tray

let prev: Tray

let playPause: Tray

let mainIcon: Tray

const createMediaTrays = () => {
    next = new Tray(getAssetPath("next.ico"))
    next.addListener("click", () => {
        robot.keyTap("audio_next")
    })

    prev = new Tray(getAssetPath("back.ico"))
    prev.addListener("click", () => {
        robot.keyTap("audio_prev")
    })

    playPause = new Tray(getAssetPath("play.ico"))
    playPause.addListener("click", () => {
        robot.keyTap("audio_play")
    })
}

const destroyMediaTrays = () => {
    next.destroy()
    prev.destroy()
    playPause.destroy()
}

const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets')

const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths)
}

const createMainTray = (showCallback, quitCallback) => {


    mainIcon = new Tray(getAssetPath("favicon.ico"))
    mainIcon.addListener("click", () => {
        showCallback()
    })

    mainIcon.setContextMenu(Menu.buildFromTemplate([
        {
            label: 'Show',
            click: () => {
                showCallback()
            }
        },
        {
            label: 'Quit',
            click: () => {
                quitCallback() // actually quit the app.
            }
        },
    ]))
}

export { createMediaTrays, destroyMediaTrays, createMainTray }