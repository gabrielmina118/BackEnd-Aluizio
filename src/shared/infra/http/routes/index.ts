import { Router } from 'express';
import { orderRouter } from '../../../../modules/order/infra/http/routers/orderRouter';
import { productRouter } from '../../../../modules/products/infra/http/routes/productRouter';
import { customerRouter } from '../../../../modules/customers/infra/http/routers/customerRouter';
import { passwordRouter } from '../../../../modules/users/infra/http/routes/passwordRouter';
import { profileRouter } from '../../../../modules/users/infra/http/routes/profileRouter';
import { sessionsRouter } from '../../../../modules/users/infra/http/routes/sessionsRouter';
import { userRouter } from '../../../../modules/users/infra/http/routes/userRouter';

export const routes = Router();

routes.use('/customer', customerRouter);
routes.use('/products', productRouter);
routes.use('/users', userRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use("/order",orderRouter)
