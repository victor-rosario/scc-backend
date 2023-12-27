import path from 'path'
import dotenv from 'dotenv'
import { serverConfig } from '@config'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

serverConfig && {}

dotenv.config({
	path:
		process.env.NODE_ENV !== undefined
			? `.env.${process.env.NODE_ENV.trim()}`
			: '.env'
})

export default {
	name: process.env.DATABASE_NAME as string,
	type: process.env.DATABASE_TYPE as string,
	host: process.env.DATABASE_HOST as string,
	port: parseInt(`${process.env.DATABASE_PORT}`),
	username: process.env.DATABASE_USERNAME as string,
	password: process.env.DATABASE_PASSWORD as string,
	database: process.env.DATABASE_DATABASE as string,
	ssl: process.env.DATABASE_EXTRA_SSL === 'true',
	schema: process.env.DATABASE_SCHEMA || 'public',
	synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
	logging: process.env.DATABASE_LOGGING === 'true',
	autoReconnect: process.env.DATABASE_AUTO_RECONNECT === 'true',
	reconnectTries: parseInt(`${process.env.DATABASE_AUTO_RECONNECT_TRIES}`),
	reconnectInterval: parseInt(
		`${process.env.DATABASE_AUTO_RECONNECT_INTERVAL}`
	),
	// ...(serverConfig.isLive && {
	// 	extra: {
	// 		ssl: {
	// 			rejectUnauthorized:
	// 				process.env.DATABASE_EXTRA_SSL_REJECT_UNAUTHORIZED ===
	// 				'true'
	// 		}
	// 	}
	// }),
	entities: [
		path.join(__dirname, '/../database/entities/**/*.{entity,view}.{ts,js}'),
	],
	migrations: [path.join(__dirname, '/../database/migrations/*.{ts,js}')],
	seeds: [path.join(__dirname, '/../database/seeding/seeds/*.seed.{ts,js}')],
	factories: [
		path.join(__dirname, '/../database/seeding/factories/*.factory.{ts,js}')
	],
	subscribers: [path.join(__dirname, '/../database/subscribers/*.{ts,js}')],
	cli: {
		entitiesDir: path.join(__dirname, '/../database/entities'),
		migrationsDir: path.join(__dirname, '/../database/migrations'),
		subscribersDir: path.join(__dirname, '/../database/subscribers')
	},
	cache: {
		duration: 60000
	}
} as PostgresConnectionOptions
