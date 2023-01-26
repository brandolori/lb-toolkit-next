import path from 'path'
import robot from "robotjs"
import { getSettingValue, settingsChangeEmitter } from "./settings"
import { globalShortcut, clipboard, BrowserWindow, app, ipcMain, nativeTheme, screen } from "electron"
import { startListeningToClipboard, stopListeningToClipboard } from "./clipboard"
import { isLogin, registerAtLogin, unregisterAtLogin } from "./login"
import initMessageHandlers from './messageHandlers'
import { createMediaTrays, destroyMediaTrays, createMainTray } from './trays'
import { resolveHtmlPath } from '../common/utils'

const clipboardCallback = () => mainWindow?.webContents.send('clipboard:change')

// enable clipboard listener, then register to settings change
if (getSettingValue("enableClipboardSync"))
    startListeningToClipboard(clipboardCallback)

settingsChangeEmitter.on("enableClipboardSync", (value) => {
    if (value)
        startListeningToClipboard(clipboardCallback)
    else
        stopListeningToClipboard()
})

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

let mainWindow: BrowserWindow
let clipboardWindow: BrowserWindow

let windowsByWebcontentsId = {}

const colorPickerKeyCombo = "super+control+x"
const clipboardWindowKeyCombo = "super+control+z"

const registerColorPicker = () => {
    globalShortcut.register(colorPickerKeyCombo, () => {
        try {
            const { x, y } = robot.getMousePos()
            clipboard.writeText(robot.getPixelColor(x, y))
        } catch (e) { }
    })
}

const unregisterColorPicker = () => {
    globalShortcut.unregister(colorPickerKeyCombo)
}

const createClipboardWindow = () => {

    const cursorPoint = screen.getCursorScreenPoint()

    clipboardWindow = new BrowserWindow({
        show: false,
        skipTaskbar: true,
        width: 400,
        height: 400,
        resizable: false,
        backgroundColor: nativeTheme.shouldUseDarkColors ? "#1a1b1e" : undefined,
        titleBarStyle: "hidden",
        x: cursorPoint.x,
        y: cursorPoint.y,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            devTools: !app.isPackaged,
            webSecurity: false
        }
    })

    windowsByWebcontentsId[clipboardWindow.webContents.id] = clipboardWindow

    clipboardWindow.removeMenu()
    clipboardWindow.loadURL(resolveHtmlPath('index.html', "?page=clipboard"))


    clipboardWindow.on("blur", () => {
        clipboardWindow.close()
    })

    clipboardWindow.on('close', () => {
        delete windowsByWebcontentsId[clipboardWindow.webContents.id]
        clipboardWindow = null
    })

}

const showOrCreateMainWindow = () => {
    if (mainWindow) {
        mainWindow.focus()
    } else {
        createMainWindow()
    }
}

const createMainWindow = () => {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        show: false,
        width: 800,
        height: 600,
        minHeight: 400,
        minWidth: 600,
        backgroundColor: nativeTheme.shouldUseDarkColors ? "#1a1b1e" : undefined,
        titleBarStyle: "hidden",
        titleBarOverlay: {
            color: nativeTheme.shouldUseDarkColors ? "#1a1b1e" : undefined,
            symbolColor: nativeTheme.shouldUseDarkColors ? "white" : undefined,
            height: 40
        },
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            devTools: !app.isPackaged,
            webSecurity: false,
            sandbox: true,
        }
    })

    windowsByWebcontentsId[mainWindow.webContents.id] = mainWindow

    mainWindow.removeMenu()

    // Open the DevTools.
    mainWindow.loadURL(resolveHtmlPath('index.html'))
    if (!app.isPackaged)
        mainWindow.webContents.openDevTools()

    mainWindow.on('close', () => {
        delete windowsByWebcontentsId[mainWindow.webContents.id]
        mainWindow = null
    })
}

const onReady = () => {
    if (app.isPackaged) {
        settingsChangeEmitter.on("enableRunOnLogin", (value) => {
            if (value)
                registerAtLogin()
            else
                unregisterAtLogin()
        })
    }

    createMainTray(() => showOrCreateMainWindow(), () => app.quit())

    app.on("second-instance", () => {
        showOrCreateMainWindow()
    })

    // enable media tray icons, then register on setting change
    if (getSettingValue("enableMediaControls"))
        createMediaTrays()

    settingsChangeEmitter.on("enableMediaControls", (value) => {
        if (value)
            createMediaTrays()
        else
            destroyMediaTrays()
    })

    // enable color picker, then register on setting change
    if (getSettingValue("enableColorPicker"))
        registerColorPicker()

    settingsChangeEmitter.on("enableColorPicker", (value) => {
        if (value)
            registerColorPicker()
        else
            unregisterColorPicker()
    })

    globalShortcut.register(clipboardWindowKeyCombo, () => {
        if (!clipboardWindow) {
            createClipboardWindow()
        }
    })

    initMessageHandlers()

    // make sure window are shown when React has rendered
    // how it works: every window has a webcontents id,
    // the same webcontents id is in every event emitted by the window
    // so we show the window by finding it in a dictionary
    ipcMain.on("render:readyToShow", (ev) => {
        const window = windowsByWebcontentsId[ev.sender.id]
        window.show()
    })

    if (!isLogin()) {

        createMainWindow()
    }

}

export default onReady