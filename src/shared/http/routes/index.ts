import { Router } from 'express';

import usersRouter from '@modules/users/routes';

const routes = Router();

routes.use('/', usersRouter)

export default routes;