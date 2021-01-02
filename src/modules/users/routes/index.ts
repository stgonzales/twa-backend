import { Router } from 'express';
const routes = Router();

import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes'


routes.use('/users', usersRouter)

routes.use('/session', sessionsRouter)

export default routes;
