import { Button, Group, Stack, Switch } from "@mantine/core"
import { substitutePath } from "./utils"
import { useEffect, useState } from "react"
import { Settings } from "common/SettingsItems"

type Setting = {
    name: string
    key: keyof Settings,
}

const settings: Setting[] = [
    {
        key: "enableColorPicker",
        name: "Enable color picker"
    },
    {
        key: "enableMediaControls",
        name: "Enable tray media controls"
    },
    {
        key: "enableRunOnLogin",
        name: "Enable run on login"
    },
    {
        key: "enableClipboardSync",
        name: "Enable clipboard Sync"
    }
]

const defaultState: SettingState[] = settings.map(el => ({
    key: el.key,
    value: false
}))

type SettingState = {
    key: string,
    value: boolean
}

const openSettingsFile = async () => {
    const path = "<userData>\\settings.json"
    const substitutedPath = await substitutePath(path)
    window.electronAPI.openFolder(substitutedPath)
}

const AppSettings = () => {

    const [settingsState, setSettingsState] = useState<SettingState[]>(defaultState)

    const loadSetting = async (setting: keyof Settings) => {
        const value = await window.electronAPI.getSettingValue(setting)
        setSettingsState((state) => state.map(el => el.key == setting
            ? { key: setting, value: value }
            : el))
    }

    const changeSetting = async (setting: keyof Settings, value: boolean) => {
        try {
            await window.electronAPI.setSettingValue(setting, value)
        } catch (e) { }
        await loadSetting(setting)
    }

    useEffect(() => {
        settings.forEach(el => {
            loadSetting(el.key)
        })
    }, [])

    return <Stack>
        {settings.map(el =>
            <Switch
                checked={settingsState.find(set => set.key == el.key).value}
                onChange={(ev) => changeSetting(el.key, ev.target.checked)}
                key={el.key}
                label={el.name} />
        )}
        <Group>
            <Button
                variant="default"
                onClick={() => openSettingsFile()}>
                Show settings file
            </Button>
        </Group>
    </Stack >
}

export default AppSettings