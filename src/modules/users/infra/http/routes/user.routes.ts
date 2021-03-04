import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import UserController from '../controllers/UserController';
import ensureAuth from '../middlewares/ensureAuth';

const userRouter = Router();
const userController = new UserController();

userRouter.use(ensureAuth);

userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      type_id: Joi.string().required(),
      status: Joi.boolean().required(),
    },
  }),
  userController.create,
);

userRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      type_id: Joi.string().required(),
      status: Joi.boolean().required(),
    },
  }),
  userController.update,
);

userRouter.delete('/:id', userController.delete);

export default userRouter;
