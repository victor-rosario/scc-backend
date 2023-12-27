import { validate } from 'class-validator'
import { Request, Response, NextFunction } from 'express'
import { ClassConstructor, plainToInstance } from 'class-transformer'
import { ValidationDTOEnum, ValidationDTOType } from './validate-dto.interface'
import { convertObjectValues } from '@utils/object.util'

export const validateDTO = (
	dtoClass: ClassConstructor<ObjectI>,
	type: ValidationDTOType = 'body',
	clearEmptyString = true,
	convertObjectValue = false
) => {
	return function (req: Request, res: Response, next: NextFunction) {
		const types: string[] = Object.values(ValidationDTOEnum)
		if (!types.includes(type))
			return res.status(500).json({
				error: { message: 'Invalid type into validation DTO' }
			})

		if (convertObjectValue) {
			req[type] = convertObjectValues(req[type])
		}

		const data: ObjectI = plainToInstance(dtoClass, req[type], {
			strategy: "exposeAll"
		})

		validate(data, { whitelist: true })
			.then((errors) => {
				const error = (errors || []).pop()
				const errorMessage = Object.values(error?.constraints || {})[0]
				if (errorMessage)
					return res
						.status(400)
						.json({ error: { message: errorMessage } })

				for (const key in data) {
					if (
						(clearEmptyString && data[key] === '') ||
						data[key] === null ||
						data[key] === undefined
					)
						delete data[key]
				}

				req[type] = data

				return next()
			})
			.catch((error) => {
				return res
					.status(500)
					.json({ error: { message: error.message } })
			})
	}
}
