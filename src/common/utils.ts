import ChildProcess from "child_process"
import path from "path"
import fs from "fs"
import { app } from "electron"

const dirSize = (directory: string) => {
    const files = fs.readdirSync(directory)

    return files.reduce((accumulator, file) => {
        const stats = fs.statSync(path.join(directory, file))
        return stats.isFile()
            ? accumulator + stats.size
            : accumulator + dirSize(path.join(directory, file))
    }, 0)
}

const handleCommand = (command, args) => new Promise<string>((res, rej) => {
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

const resolveHtmlPath = (htmlFileName: string, search: string = "") => {
    if (process.env.NODE_ENV === 'development') {
        const port = process.env.PORT || 1212
        const url = new URL(`http://localhost:${port}`)
        url.pathname = htmlFileName
        url.search = search
        return url.href
    }
    return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}${search}`
}

const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets')

const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths)
}

export { dirSize, handleCommand, resolveHtmlPath, getAssetPath }