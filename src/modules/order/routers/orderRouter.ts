import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import OrderController from '../controllers/OrderController';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

export const orderRouter = Router();

const orderController = new OrderController();

orderRouter.get(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  orderController.showOrderById,
);

orderRouter.post(
  '/create',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().uuid().required(),
      products: Joi.required(),
    },
  }),
  orderController.createOrder,
);
