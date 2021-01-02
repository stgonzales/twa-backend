import { Request, Response } from 'express'

import AuthUserService from "../services/AuthUserService";

export default class UsersController {

    public async execute(req: Request, res: Response): Promise<Response> {

        const { email, password } = req.body;

        const authenticateUser = new AuthUserService()

        const { token, user } = await authenticateUser.execute({
            email,
            password
        })

        return res.json({
            user,
            token
        })
    }
}