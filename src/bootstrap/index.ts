import { Server } from 'http'
import { Server as ServerSSL } from 'https'
import databases from './databases'
import socket from './socket'
import upload from './upload'

export default async (server: Server | ServerSSL, callback: VoidFunction) => {
	await upload()
	await databases()
	socket.connect(server)
	callback()
}
