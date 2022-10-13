import { AzureSASCredential, TableClient, odata } from "@azure/data-tables"
import { getSettingValue } from "./settings"
import clipboardListener from 'clipboard-event'
import { ipcMain } from "electron"

const getTableClient = () => {
    const account = getSettingValue("azureStorageAccount")
    const SASToken = getSettingValue("azureSASToken")
    const tableName = getSettingValue("azureTableName")
    return new TableClient(
        `https://${account}.table.core.windows.net`,
        tableName,
        new AzureSASCredential(SASToken)
    )

}

const startClipboardListener = (callback) => {
    clipboardListener.on('change', callback)
    clipboardListener.startListening()
}

const stopClipboardListener = () => {
    clipboardListener.removeAllListeners()
    clipboardListener.stopListening()
}


const fetchClips = async (filter) => {
    const data = []
    const tableClient = getTableClient()
    const days = filter == "today" ? 1 :
        filter == "this week" ? 7 :
            filter == "this month" ? 30 : 100000
    const filterDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000) // 1 days ago
    for await (const entity of tableClient.listEntities({
        queryOptions: {
            filter: odata`Timestamp ge ${filterDate}`,
        }
    })) {
        data.push({
            date: entity.timestamp,
            id: entity.rowKey,
            source: entity.partitionKey,
            text: entity.text
        })
    }

    return data.sort((a, b) => a.date > b.date ? -1 : 1)
}

ipcMain.handle('clipboard:fetchClips', async (ev, filter) => {
    return await fetchClips(filter)
})

export { getTableClient, startClipboardListener, stopClipboardListener }