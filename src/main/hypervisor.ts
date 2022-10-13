import sudo from 'sudo-prompt'
const onString = "Auto"
const offString = "Off"

const setHypervisor = (enabled: boolean): Promise<void> => {
    const launchType = enabled ? onString : offString
    return new Promise<void>((res, rej) => {
        sudo.exec(`bcdedit /set hypervisorlaunchtype ${launchType}`,
            { name: "lb toolkit" },
            (error) => {
                if (!error)
                    res()
                else
                    rej(error)
            }
        )
    })
}

const getHypervisor = (): Promise<boolean> => {
    return new Promise((res, rej) => {
        sudo.exec(`bcdedit /enum`,
            { name: "lb toolkit" },
            (error, stdout) => {
                if (!error) {
                    let ret = /^\s*hypervisorlaunchtype\s* (.+)\s*$/gm.exec(stdout.toString())
                    res(ret[1] == onString ? true : false)
                }
                else
                    rej(error)
            }
        )
    })
}

export { setHypervisor, getHypervisor }