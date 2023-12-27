import { cookieConfig, frontendConfig } from "@config";
import { UserEntity } from "@database/entities/entity/user.entity";
import userMemory from "@memory/user.memory";
import { signInService } from "@services/user/signin.service";
import { Request, Response } from "express";

export const signInController = async (req: Request, res: Response) => {

    const user = await signInService(req.body).catch((e) => {
        console.error("signInService: ", e)
        return null
    })
    if (!user) {
        return res.status(401).json({ error: { message: 'Invalid credentials' } })
    }

    userMemory.set(user?.uuid as string, user as UserEntity)

    //@ts-ignore
    req.session[cookieConfig.names.public] = {
        user: `${user.uuid}`.encrypt()
    }

    const response = {
        login: true,
        dashboardUrl:
            req.query.returnDashboardUrl === 'true'
                ? frontendConfig.urlWebApp
                : undefined
    }

    return res.json(response)
}