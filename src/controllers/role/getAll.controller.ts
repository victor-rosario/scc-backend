import { getAllRoleService } from '@services/roles/getAll.service'
import { addFixedPropertiesToWhereFilter } from '@utils/typeorm'
import { Request, Response } from 'express'
import { ILike, In } from 'typeorm'

const defaultRoles = [
    "patient",
    "representative",
    "institution",
]

export const getAllRoleController = async(req: Request, res: Response) => {

    const search = req.query.search ? ILike(`%${req.query.search}%`) : null

    let where = search
    ? [
            {
                ...req?.filter?.where,
                name: search
            }
      ]
    : req?.filter?.where

    where = addFixedPropertiesToWhereFilter(where, {
        ...(!req?.user?.uuid && {
            slug: In(defaultRoles)
        })
    })

    getAllRoleService({
        where,
        cache: true
    }).then((roles) => {
        const data = roles.map(role => ({
            uuid: role.uuid,
            name: role.name,
            slug: role.slug
        }))

        return res.json(data)
    }).catch((e) => {
        res.status(500).json({ error: { message: e.message } })
    })
}