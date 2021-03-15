import { Router } from 'express';

// ======================================
//			Routes
// ======================================
import auth from './auth.routes';
import user from './user.routes';

const routes = Router();

routes.use('/auth', auth);
routes.use('/user', user);

export default routes;
