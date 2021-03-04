import { Router } from 'express';

import typeRouter from '@modules/types/infra/http/routes/type.routes';
import rootUserRouter from '@modules/users/infra/http/routes/rootUser.routes';

const routes = Router();

routes.use('/types', typeRouter);
routes.use('/root', rootUserRouter);

export default routes;
