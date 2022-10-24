import { AzureSASCredential, TableClient, odata } from "@azure/data-tables"
import { getSettingValue } from "./settings"
import clipboardListener from 'clipboard-event'
import { ipcMain } from "electron"

export type DateFilter = "today" | "this week" | "this month" | "all"

export type ClipSource = "pc" | "phone"

export type Clip = {
    id: string,
    date: string,
    text: string,
    source: ClipSource,
    isUrl: boolean
}

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

const fetchClips = async (dateFilter?: DateFilter): Promise<Clip[]> => {
    const days = dateFilter == "today" ? 1 :
        dateFilter == "this week" ? 7 :
            dateFilter == "this month" ? 30 : 100000
    const filterDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000) // 1 days ago

    const data: Clip[] = []
    const client = getTableClient()
    const lister = client.listEntities({
        queryOptions: {
            filter: odata`Timestamp ge ${filterDate}`,
        }
    })

    for await (const entity of lister) {
        data.push({
            date: entity.timestamp,
            id: entity.rowKey,
            source: entity.partitionKey as "pc" | "phone",
            text: entity.text as string,
            isUrl: entity.isUrl as boolean ?? false
        })
    }

    return data.sort((a, b) => a.date > b.date ? -1 : 1)
}

ipcMain.handle('clipboard:fetchClips', async (ev, filter) => {
    return await fetchClips(filter)
})

export { getTableClient, startClipboardListener, stopClipboardListener }