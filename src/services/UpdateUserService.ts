import { getRepository } from "typeorm";
import { hash } from "bcryptjs";

import User from "../models/User";

import AppError from "../errors/AppError";

interface Request {
    id: string;
    name: string;
    email: string;
    admin: boolean;
    active: boolean;
}

class UpdateUserService {
    public async execute(newUserInfo: Request) {
        const usersRepository = getRepository(User);

        const checkUserExist = await usersRepository.findOne({
            where: {
                id: newUserInfo.id
            }
        })

        if (!checkUserExist) {
            throw new AppError("User not found!");
        }


        const user = {
            ...newUserInfo
        }

        delete user.id

        await usersRepository.update(newUserInfo.id, user)
        // .then(res => {
        //     return res
        // })
        // .catch(err => {
        //     throw new AppError('Failed to update user')
        // })

        return user
    }
}

export default UpdateUserService