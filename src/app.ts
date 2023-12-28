global.rootDir = __dirname

import '@prototypes'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import expressSession, { SessionOptions } from 'express-session'
import sqliteStoreFactory from 'express-session-sqlite'
import fs from 'fs'
import path from 'path'
import * as sqlite3 from 'sqlite3'
import router from '@routers'
import { serverConfig, cookieConfig } from '@config'
import morgan from 'morgan'
import helmet from 'helmet'
import { generalQueryParser } from '@middlewares/common/parser.middleware'
import { validateUUIDMiddleware } from '@middlewares/common/validate-uuid.middleware'

const { isLive } = serverConfig
const sessionDir = path.join(__dirname, '../storage/session')
if (!fs.existsSync(sessionDir)) {
	fs.mkdirSync(sessionDir, { recursive: true })
}

const app = express()

const SqliteStore = sqliteStoreFactory(expressSession)

const sessionConfig: SessionOptions = {
	store: new SqliteStore({
		driver: sqlite3.Database,
		path: path.join(sessionDir, 'cookie.db'),
		ttl: cookieConfig.ttlExpire,
		prefix: cookieConfig.prefix
	}),
	secret: cookieConfig.password,
	resave: false,
	saveUninitialized: false,
	cookie: {
		secure: isLive,
		httpOnly: true,
		domain: cookieConfig.domain,
		maxAge: 60 * 60 * 24 * 1000,
		sameSite: isLive ? false : 'lax'
	}
}

console.log("sessionConfig: ", sessionConfig)

app.use(
	cors({
		origin: true,
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
		credentials: true
	})
)

app.disable("x-powered-by")

app.use('/public', express.static(path.join(__dirname, '../public')))

isLive && app.set('trust proxy', 1)

app.use(express.urlencoded({ extended: true, limit: '8mb' }))
app.use(express.json())
app.use(helmet())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(expressSession(sessionConfig))
app.use(generalQueryParser)
app.use(validateUUIDMiddleware)

app.use(router)

app.use('*', (_, res) => {
	res.status(404).json({ error: { message: 'Not Found' } })
})

export default app
