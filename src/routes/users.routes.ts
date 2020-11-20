import { Router } from 'express';
import { getCustomRepository } from "typeorm";
import { validate } from "uuid";

//Repositories imports
import UsersRepository from "../repositories/UsersRepository";

//Services imports
import CreateUserService from "../services/CreateUserService";
import UpdateUserService from "../services/UpdateUserService";

//Error handler
import AppError from '../errors/AppError';

const usersRouter = Router();

//List Users
usersRouter.get('/', async (request, response) => {
    const usersRepository = getCustomRepository(UsersRepository)

    const users = await usersRepository.find()

    return response.json(users)
})

//Find One User
usersRouter.get('/:id', async (request, response) => {

    const { id } = request.params

    const isValidId = validate(id)

    if (!isValidId) {
        throw new AppError('Invalid Id!')
    }

    const usersRepository = getCustomRepository(UsersRepository)

    const user = await usersRepository.findById(id)

    if (!user) {
        throw new AppError('User not found!')
    }

    return response.json(user)
})


//Create User
usersRouter.post('/', async (request, response) => {

    const { name, email, password } = request.body
    const { admin } = request.body.admin ? request.body : false

    const createUser = new CreateUserService()

    const user = await createUser.execute({
        name,
        email,
        password,
        admin
    })

    delete user.password

    return response.json(user)
})

//Update User
usersRouter.put('/:id', async (request, response) => {

    const user = {
        id: request.params.id,
        ...request.body
    }

    const updateUser = new UpdateUserService()

    const userUpdated = await updateUser.execute(user)

    return response.json(userUpdated)
})

export default usersRouter;
