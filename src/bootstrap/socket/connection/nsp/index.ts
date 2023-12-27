import { Server } from 'socket.io'
import notifications from './notifications'

export default (io: Server) => {
	notifications(io)
}
