import { handleCommand } from '../common/utils'

export default async (ssid: string) => {
	const cmd = 'netsh'
	const args = ['wlan', 'show', 'profile', `name=${ssid}`, 'key=clear']

	const stdout = await handleCommand(cmd, args) as string
	let ret

	ret = /^\s*Contenuto chiave\s*: (.+)\s*$/gm.exec(stdout)
	ret = ret && ret.length ? ret[1] : null

	if (!ret) {
		throw new Error('Could not get password')
	}

	return ret as string
}
