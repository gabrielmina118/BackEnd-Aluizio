import { Router } from 'express';
import { customerRouter } from '../../../modules/customers/routers/customerRouter';
import { productRouter } from '../../../modules/products/routes/productRouter';
import { passwordRouter } from '../../../modules/users/routes/passwordRouter';
import { profileRouter } from '../../../modules/users/routes/profileRouter';
import { sessionsRouter } from '../../../modules/users/routes/sessionsRouter';
import { userRouter } from '../../../modules/users/routes/userRouter';

export const routes = Router();

routes.use('/products', productRouter);
routes.use('/users', userRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/customer', customerRouter);
