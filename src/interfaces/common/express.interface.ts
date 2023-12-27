export interface IQueryPagination {
	skip: number
	take: number
}

export interface IQueryFilter {
	[key: string]: string | number | boolean | Array<unknown> | IQueryFilter | ObjectI
	where: ObjectI
}

export interface IQueryDates {
	start: Date
	end: Date
}