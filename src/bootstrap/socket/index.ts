import { Server } from 'http'
import { Server as ServerSSL } from 'https'
import Connection from "./connection"

const connection = new Connection()

export default {
    connect(server: Server | ServerSSL) {
        connection.connect(server)
    },
    disconnect() {
        console.log("disconnect")
    }
}