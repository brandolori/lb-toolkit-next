import { app } from 'electron'
import { isSquirrel } from './squirrel'
import onReady from "./bootstrap"
// Module to create native browser window.

let canLoad = true

// // this package checks if we are in install mode and executes the install scripts
// if (isSquirrel()) {
//     canLoad = false
//     app.quit()
// }

// // make sure we are the only instance running, otherwise quit
if (!app.requestSingleInstanceLock()) {
    canLoad = false
    app.quit()
}

if (canLoad) {
    console.log("ciao")
    app.whenReady().then(() => onReady());

    app.on('window-all-closed', (ev) => {
        // leaving this empty prevents the default action
    })
}
