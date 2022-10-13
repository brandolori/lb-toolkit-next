const SettingsItems = {
    enableColorPicker: "enableColorPicker",
    enableMediaControls: "enableMediaControls",
    enableRunOnLogin: "enableRunOnLogin",
    enableClipboardSync: "enableClipboardSync",
    azureStorageAccount: "azureStorageAccount",
    azureSASToken: "azureSASToken",
    azureTableName: "azureTableName",
}

const DefaultValues = {
    [SettingsItems.enableColorPicker]: true,
    [SettingsItems.enableMediaControls]: true,
    [SettingsItems.enableRunOnLogin]: true,
    [SettingsItems.enableClipboardSync]: false,
    [SettingsItems.azureStorageAccount]: "",
    [SettingsItems.azureSASToken]: "",
    [SettingsItems.azureTableName]: "",
}

export { SettingsItems, DefaultValues }