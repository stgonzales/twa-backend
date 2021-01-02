import { EntityRepository, getRepository } from "typeorm";
import { sign } from "jsonwebtoken";


import User from "@modules/users/models/User";

import AppError from "../../../errors/AppError";
import UsersRepository from "../repositories/UsersRepository";

import authConfig from '../../../config/auth'


interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User,
    token: string,
}

@EntityRepository(User)
class AuthUserService {

    public async execute({ email, password }: IRequest): Promise<IResponse> {

        const usersRepository = new UsersRepository()

        const user = await usersRepository.findByEmail(email)

        if (!user) {
            throw new AppError('Incorrect email and password combination', 401)
        }

        const passwordMatched = await usersRepository.compareHash(password, user.password)

        if (!passwordMatched) {
            throw new AppError('Incorrect email and password combination', 401)
        }

        const { secret, expiresIn } = authConfig.jwt

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn
        })

        return { token, user }
    }
}

export default AuthUserService