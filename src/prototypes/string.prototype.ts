import bcryptjs from 'bcryptjs'
import Encryption from '@utils/encryption'

String.prototype.toSlug = function () {
	return this.replace(/\s/g, '-').toLowerCase().replace(/_/g, '-')
}

String.prototype.btoa = function (): string {
	return Buffer.from(this).toString('base64')
}

String.prototype.onlyNumber = function (): string {
	return this.replace(/[^0-9]/g, "")
}

String.prototype.atob = function (): string {
	return Buffer.from(this, 'base64').toString()
}

String.prototype.encryptPassword = function (salt = 10): string {
	return bcryptjs.hashSync(this.toString(), salt)
}

String.prototype.encrypt = function (): string | null {
	return Encryption.instance.encrypt(this.toString())
}

String.prototype.decrypt = function (): string | null {
	return Encryption.instance.decrypt(this.toString())
}

String.prototype.toEnum = function (): string {
	return this.toUpperCase().replace(/-/g, '_')
}

String.prototype.slugToString = function (): string {
	return this.toLowerCase().replace(/-/g, ' ')
}

String.prototype.capitalize = function (): string {
	return `${this}`.replace(/\b(\w)(\w*)/g, function(_match, firstChar, restOfString) {
		return firstChar.toUpperCase() + restOfString.toLowerCase();
	});
}

String.prototype.json = function <T>(): T | undefined {
	try {
		return JSON.parse(this as string)
	} catch (error) {
		// console.error('String.prototype.json() error: ', error)
		return undefined
	}
}
