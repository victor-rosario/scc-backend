import { getAllRequestService } from '@services/request/getAll.service'
import { addFixedPropertiesToWhereFilter } from '@utils/typeorm'
import { Request, Response } from 'express'
import { Between, ILike } from 'typeorm'

export const getAllRequestController = async (req: Request, res: Response) => {
	const search = req.query.search ? ILike(`%${req.query.search}%`) : null

	let where = search
		? [
				{
					...req?.filter?.where,
					caseCode: search
				},
				{
					...req?.filter?.where,
					fullName: search
				},
				{
					...req?.filter?.where,
					identification: search
				},
				{
					...req?.filter?.where,
					rnc: search
				},
				{
					...req?.filter?.where,
					institutionName: search
				}
		  ]
		: req?.filter?.where

	where = addFixedPropertiesToWhereFilter(where, {
		...(req.dates && {
			createdAt: Between(req.dates.start, req.dates.end)
		})
	})

	getAllRequestService({
		where,
		...req.pagination,
		order: {
			createdAt: req.order
		}
	})
		.then((result) => {
			const [data, count] = result
			return res.json({ data, count })
		})
		.catch((e) => {
			return res.status(500).json({ error: { message: e.message } })
		})
}
