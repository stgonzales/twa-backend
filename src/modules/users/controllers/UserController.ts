import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm';
import { validate } from 'uuid';

import AppError from '../../../errors/AppError';

import UsersRepository from '../repositories/UsersRepository'
import CreateUserService from '../services/CreateUserService';
import UpdateUserService from '../services/UpdateUserService';


interface IUser {
    name: string;
    email: string;
    password?: string;
    admin: boolean;
}


export default class UsersController {

    public async index(req: Request, res: Response): Promise<Response> {

        const usersRepository = new UsersRepository();

        const users = await usersRepository.findAllUsers()

        return res.json(users)
    }

    public async create(req: Request, res: Response) {

        const { name, email, password } = req.body
        const { admin } = req.body.admin ? req.body : false

        const createUser = new CreateUserService()

        const user: IUser = await createUser.execute({
            name,
            email,
            password,
            admin,
        })

        delete user.password

        return res.json(user)
    }

    public async one(req: Request, res: Response) {

        const { id } = req.params

        //Duplicated code
        const isValidId = validate(id)

        if (!isValidId) {
            throw new AppError('Invalid ID, please double check it')
        }

        const usersRepository = getCustomRepository(UsersRepository)

        const user = await usersRepository.findById(id)

        if (!user) {
            throw new AppError('User not found!');
        }

        return res.json(user)
    }

    public async update(req: Request, res: Response) {

        const { id } = req.params
        const { name, email, password, admin, active } = req.body

        const updateUser = new UpdateUserService();

        //Duplicated code
        const isValidId = validate(id)

        if (!isValidId) {
            throw new AppError('Invalid ID, please double check it')
        }

        const user = {
            id,
            name,
            email,
            password,
            admin,
            active,
        }

        const userUpdated = await updateUser.execute(user)

        return res.json(userUpdated);

    }
}