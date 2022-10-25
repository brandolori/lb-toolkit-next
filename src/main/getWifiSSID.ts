import { handleCommand } from '../common/utils'

const getWifiSSID = async () => {
	const cmd = 'netsh'
	const args = ['wlan', 'show', 'interface']

	const stdout = await handleCommand(cmd, args)
	let ret

	ret = /^\s*SSID\s*: (.+)\s*$/gm.exec(stdout)
	ret = ret && ret.length ? ret[1] : null

	if (!ret) {
		throw new Error('Could not get SSID')
	}

	return ret as string
}

export default getWifiSSID