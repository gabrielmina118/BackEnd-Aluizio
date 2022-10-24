import { Router } from 'express';
import UsersControllers from '../controllers/UsersControllers';
import { celebrate, Joi, Segments } from 'celebrate';
import UserAvatarController from '../controllers/UserAvatarController';
import multer from 'multer';
import uploadConfig from "../../../../../config/multer/upload"
import isAuthenticated from '../../../../../shared/infra/http/middlewares/isAuthenticated';

export const userRouter = Router();

const userController = new UsersControllers();
const userAvatarController = new UserAvatarController();

// middleware do multer com as config
const upload = multer(uploadConfig.multer);

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
userRouter.get('/list', isAuthenticated, userController.listUsers);
userRouter.patch(
  '/updateAvatar',
  isAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);
