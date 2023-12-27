import dotenv from 'dotenv'
import { serverConfig } from './general'

dotenv.config({
	path:
		process.env.NODE_ENV !== undefined
			? `.env.${process.env.NODE_ENV.trim()}`
			: '.env'
})

export const cookieConfig = {
	password: process.env.COOKIE_PASSWORD as string,
	prefix: process.env.COOKIE_PREFIX as string,
	ttlExpire: parseFloat(`${process.env.COOKIE_TTL_EXPIRE}`),
	domain: process.env.COOKIE_DOMAIN as string,
	names: {
		public: process.env.COOKIE_PUBLIC_NAME as string,
	}
}

export const securityConfig = {
	encryption: {
		key: process.env.ENCRYPTION_KEY as string,
		algorithm: process.env.ENCRYPTION_ALGORITHM as string
	}
}

export const frontendConfig = {
	urlWebApp: process.env.FRONTEND_WEB_APP_URL as string
}

serverConfig.appUrl = process.env.APP_URL as string

export { serverConfig }