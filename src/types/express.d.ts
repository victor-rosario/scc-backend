import {
	IQueryDates,
	IQueryPagination
} from '@interfaces/common/express.interface'
import { FindOptionsWhere } from 'typeorm'
import { UserEntity } from '@database/entities/entity/user.entity'

declare global {
	namespace Express {
		interface Request {
			session: ObjectI
			pagination?: IQueryPagination
			dates?: IQueryDates
			order: "ASC" | "DESC"
			filter: FindOptionsWhere | ObjectI
			user: UserEntity
			isSuperAdmin: boolean
			cookies: {
				[key: string]: string
			}
		}
	}
}

export { }
