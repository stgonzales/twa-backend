import ensureAuthenticated from '@shared/http/middlewares/ensureAuthenticated';
import { Router } from 'express';

import UsersController from '../controllers/UserController';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.use(ensureAuthenticated)

//List All Users
usersRouter.get('/', usersController.index)

//Find One User
usersRouter.get('/:id', usersController.one)

//Create User
usersRouter.post('/', usersController.create)

//Update User
usersRouter.put('/:id', usersController.update)

export default usersRouter;
