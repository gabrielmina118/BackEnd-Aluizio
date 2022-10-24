import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ProfileController from '../controllers/ProfileController';
import isAuthenticated from '../../../../../shared/infra/http/middlewares/isAuthenticated';

export const profileRouter = Router();

const profileController = new ProfileController();

// chamada do midlewarre
profileRouter.use(isAuthenticated);

profileRouter.get('/', profileController.showProfile);
profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string().optional(),
      password_confirmation: Joi.string()
        .valid(Joi.ref('password'))
        .when('password', {
          is: Joi.exist(),
          then: Joi.required(),
        }),
    },
  }),
  profileController.update,
);
