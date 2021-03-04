import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import RootUserController from '../controllers/RootUserController';

const rootUserRouter = Router();
const rootUserController = new RootUserController();

rootUserRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      status: Joi.boolean().required(),
    },
  }),
  rootUserController.create,
);

export default rootUserRouter;
