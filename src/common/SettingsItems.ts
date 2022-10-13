export type Settings = {
    enableColorPicker: boolean,
    enableMediaControls: boolean,
    enableRunOnLogin: boolean,
    enableClipboardSync: boolean,
    azureStorageAccount: string,
    azureSASToken: string,
    azureTableName: string,
}

export const DefaultValues: Settings = {
    enableColorPicker: true,
    enableMediaControls: true,
    enableRunOnLogin: true,
    enableClipboardSync: false,
    azureStorageAccount: "",
    azureSASToken: "",
    azureTableName: "",
}
