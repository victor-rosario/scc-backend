import { Request, Response } from "express";

export const meController = (req: Request, res: Response) => {

    const user = req.user

    if(!user) {
        return res.status(401).json({ error: { message: 'Unauthorized' } })
    }

    const role = user.role
    const info = user.info;

    const data = {
        uuid: user?.uuid,
        createdAt: user?.createdAt,
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        active: user?.active,
        info: {
            userName: info?.userName,
            nationality: info?.nationality,
            identification: info?.identification,
            identificationType: info?.identificationType,
            birthDate: info?.birthDate,
            phone: info?.phone,
            mobile: info?.mobile,
            gender: info?.gender,
            conversationAbility: info?.conversationAbility,
            institutionName: info?.institutionName,
            rnc: info?.rnc,
            institutionPosition: info?.institutionPosition
        },
        role: {
            name: role?.name,
            slug: role?.slug
        }
    }

    return res.json(data)

}