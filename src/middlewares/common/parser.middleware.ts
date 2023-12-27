import { NextFunction, Request, Response } from 'express'
import { IQueryPagination } from 'interfaces/common/express.interface'
import { FindOptionsWhere } from 'typeorm'

export const generalQueryParser = (
	req: Request,
	_: Response,
	next: NextFunction
) => {
	if (
		req.query.pagination &&
		req.query.pagination !== 'undefined' &&
		req.query.pagination !== 'null'
	) {
		req.pagination =
			`${req.query.pagination}`.json<IQueryPagination>() ||
			({} as IQueryPagination)

		if (typeof req.pagination.take === 'string') {
			req.pagination.take = +req.pagination.take
		}

		if (typeof req.pagination.skip === 'string') {
			req.pagination.skip = +req.pagination.skip * +req.pagination.take
		}

		if (typeof req.pagination.skip === 'number') {
			req.pagination.skip = req.pagination.skip * req.pagination.take
		}
	}

	if (
		req.query.filter &&
		req.query.filter !== 'undefined' &&
		req.query.filter !== 'null'
	) {
		req.filter =
			typeof req.query.filter !== 'object'
				? `${req.query.filter}`.json<FindOptionsWhere<any>>() || {}
				: req.query.filter
	}

	if (
		req.query.dates &&
		req.query.dates !== 'undefined' &&
		req.query.dates !== 'null'
	) {
		if (!req.dates) req.dates = { end: new Date(), start: new Date() }

		const dates = `${req.query.dates}`.json<{
			start: string
			end: string
		}>()

		req.dates.start =
			dates && dates.start ? new Date(dates.start.trim()) : new Date()
		req.dates.end =
			dates && dates.end ? new Date(dates.end.trim()) : new Date()
	}

	if (
		req.query.order ||
		req.query.order !== 'undefined' &&
		req.query.order !== 'null'
	) {
		const availableOrderTypes = ['asc', 'desc']
		const isOrderValid = availableOrderTypes.some(x => x.toLowerCase() == `${req.query.order}`.toLowerCase())
		if (isOrderValid) {
			req.order = `${req.query.order}`.toUpperCase() as "ASC" | "DESC"
		} else {
			req.order = 'DESC'
		}
	}

	return next()
}
