export const addFixedPropertiesToWhereFilter = (where: object, properties: object) => {
    if (Array.isArray(where)) return where.map(x => ({ ...x, ...properties }))
    else return { ...where, ...properties }
}