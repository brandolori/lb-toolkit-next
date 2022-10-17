import { getAssetPath } from "common/utils"
import { Tray, Menu } from "electron"
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

const createMainTray = (showCallback, quitCallback) => {

    mainIcon = new Tray(getAssetPath("smallicon.ico"))
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