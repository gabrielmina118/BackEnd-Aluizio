import { Router } from 'express';
import UsersControllers from '../controllers/UsersControllers';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../middlewares/isAuthenticated';

export const userRouter = Router();

const userController = new UsersControllers();

userRouter.post(
  '/create',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  userController.create,
);
userRouter.get('/list',isAuthenticated, userController.listUsers);
