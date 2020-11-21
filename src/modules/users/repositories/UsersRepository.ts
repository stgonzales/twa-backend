import { EntityRepository, getRepository, Repository } from "typeorm";

import User from "../models/User";

@EntityRepository(User)
class UsersRepository /*implements IUsersRepository*/ {

    private ormRepository: Repository<User>

    constructor() {
        this.ormRepository = getRepository(User)
    }

    public async findAllUsers() {
        const users = await this.ormRepository.find();

        return users;
    }

    public async findById(id: string) {
        const user = await this.ormRepository.findOne(id)

        return user
    }

}

export default UsersRepository