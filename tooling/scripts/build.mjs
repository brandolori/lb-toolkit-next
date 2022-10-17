import builder from "electron-builder"

/**
* @type {import('electron-builder').Configuration}
* @see https://www.electron.build/configuration/configuration
*/
const options = {
    compression: "maximum",
    productName: "LB Toolkit",
    appId: "com.lb.lbtoolkit",
    asar: false,
    npmRebuild: false,
    directories: {
        app: "tooling/app",
        buildResources: "assets",
        output: "release/build"
    },
    extraResources: [
        "./assets/**"
    ],
    files: [
        "dist",
        "node_modules",
        "package.json"
    ],
    win: {
        target: "squirrel"
    },
    squirrelWindows: {
        iconUrl: "https://www.lorenzobartolini.me/favicon.ico"
    }

}

// Promise is returned
builder.build({
    config: options
})
    .then((result) => {
        console.log(JSON.stringify(result))
    })
    .catch((error) => {
        console.error(error)
    })