import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import TypeController from '../controllers/TypeController';

const typeRouter = Router();
const typeController = new TypeController();

typeRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      type: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
      }).required(),
    },
  }),
  typeController.create,
);

typeRouter.get('/', typeController.index);

export default typeRouter;
