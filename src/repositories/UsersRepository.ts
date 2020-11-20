import { EntityRepository, Repository } from "typeorm";

import User from "../models/User";

@EntityRepository(User)
class UsersRepository extends Repository<User>{
    /**
     * findById
     */
    public async findById(id: string) {
        const findUser = await this.findOne({
            where: {
                id
            }
        })

        return findUser || null
    }
}

export default UsersRepository