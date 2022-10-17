import { build, Configuration } from "electron-builder"

const options: Configuration = {
    compression: "maximum",
    productName: "LB Toolkit",
    appId: "com.lb.lbtoolkit",
    asar: false,
    npmRebuild: false,
    directories: {
        app: "tooling/app",
        buildResources: "assets",
        output: "release"
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
build({
    config: options
})
    .then((result) => {
        console.log(JSON.stringify(result))
    })
    .catch((error) => {
        console.error(error)
    })