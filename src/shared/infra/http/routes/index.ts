import { Router } from 'express';

import typeRouter from '@modules/types/infra/http/routes/type.routes';

const routes = Router();

routes.use('/types', typeRouter);

export default routes;
