import { Router } from 'express'

import SessionController from '../controllers/SessionsController';

const sessionRouter = Router();

const sessionController = new SessionController()

sessionRouter.post('/', sessionController.execute)


export default sessionRouter;