import { Server } from 'http'
import { Server as ServerSSL } from 'https'
import { Server as ServerSocket } from 'socket.io'
import { frontendConfig } from '@config'

import nsp from './nsp'

class Connection {
	private io: ServerSocket

	private connectNamespace() {
		nsp(this.io)
	}

	public connect(server: Server | ServerSSL) {
		this.io = new ServerSocket(server, {
			transports: ['websocket', 'polling'],
			cors: {
				origin: [frontendConfig.urlWebApp]
			}
		})

		this.connectNamespace()
	}
}

export default Connection
