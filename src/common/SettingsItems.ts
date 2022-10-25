const DefaultValues = {
    enableColorPicker: true,
    enableMediaControls: true,
    enableRunOnLogin: true,
    enableClipboardSync: false,
    azureStorageAccount: "",
    azureSASToken: "",
    azureTableName: "",
}

export type Settings = typeof DefaultValues

export { DefaultValues }