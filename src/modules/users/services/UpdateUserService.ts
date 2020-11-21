import { getRepository } from "typeorm";
import { hash } from "bcryptjs";

import User from "../models/User";

import AppError from "../../../errors/AppError";

interface Request {
    id: string;
    name: string;
    email: string;
    admin: boolean;
    active: boolean;
}

class UpdateUserService {
    public async execute({ id, name, email, admin, active }: Request) {

        const usersRepository = getRepository(User);

        const checkUserExist = await usersRepository.findOne(id)

        if (!checkUserExist) {
            throw new AppError("User not found!");
        }


        const user = {
            id,
            name,
            email,
            admin,
            active
        }

        await usersRepository.update(id, user)
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