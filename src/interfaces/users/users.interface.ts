// import { any } from '@database/entities/public/user-info.entity'
// import { any } from '@database/entities/public/user-password.entity'
// import { any } from '@database/entities/public/user.entity'
import { DeepPartial } from 'typeorm'

export interface ICreateUserPayload {
	user: DeepPartial<any>
	info?: DeepPartial<any>
	passwordData: DeepPartial<any>
}

export interface IExcelUsersOptions {
	dates?: {
		start: string
		end: string
	}
}

export interface IChangePasswordPayload {
	currentPassword: string
	newPassword: string
	user: any
}

export enum UserIdentificationTypeEnum {
	RNC = 'RNC',
	ID_CARD = 'ID_CARD',
	PASSPORT = 'PASSPORT',
}

export type UserIdentificationTypeType =
	(typeof UserIdentificationTypeEnum)[keyof typeof UserIdentificationTypeEnum]
