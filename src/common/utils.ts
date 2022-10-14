import ChildProcess from "child_process"
import path from "path"
import fs from "fs"
import { app } from "electron"

export const dirSize = (directory: string) => {
    const files = fs.readdirSync(directory)

    return files.reduce((accumulator, file) => {
        const stats = fs.statSync(path.join(directory, file))
        return stats.isFile()
            ? accumulator + stats.size
            : accumulator + dirSize(path.join(directory, file))
    }, 0)
}

export const handleCommand = (command, args) => new Promise<string>((res, rej) => {
    const proc = ChildProcess.spawn(command, args)

    let buffer = []
    proc.stdout.on("data", (data) => {

        buffer.push(data)
    })

    proc.on("close", () => {
        const finalStdout = buffer.join("")
        res(finalStdout)
    })
})

export const resolveHtmlPath = (htmlFileName: string, search: string = "") => {
    if (process.env.NODE_ENV === 'development') {
        console.log("INDEVV")
        const port = process.env.PORT || 1212
        const url = new URL(`http://localhost:${port}`)
        url.pathname = htmlFileName
        url.search = search
        return url.href
    }
    console.log("NONDEVV")
    return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}${search}`
}

export const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets')

export const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths)
}
