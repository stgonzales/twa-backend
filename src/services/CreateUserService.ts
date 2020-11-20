import { getRepository } from "typeorm";
import { hash } from "bcryptjs";

import User from "../models/User";

import AppError from "../errors/AppError";

interface Request {
    name: string;
    email: string;
    password: string;
    admin?: boolean;
}

class CreateUserService {
    public async execute({ name, email, password, admin }: Request) {
        const usersRepository = getRepository(User);

        const checkUserExist = await usersRepository.findOne({
            where: {
                email
            }
        })

        if (checkUserExist) {
            throw new AppError("Email address already exist");
        }

        const hashedPassword = await hash(password, 8);

        const user = {
            name,
            email,
            password: hashedPassword,
            admin
        }

        await usersRepository.save(user);

        return user
    }
}

export default CreateUserService