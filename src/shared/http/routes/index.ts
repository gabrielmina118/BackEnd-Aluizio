import {Router } from 'express';
import { productRouter } from '../../../modules/products/routes/productRouter';
import { passwordRouter } from '../../../modules/users/routes/passwordRouter';
import { sessionsRouter } from '../../../modules/users/routes/sessionsRouter';
import { userRouter } from '../../../modules/users/routes/userRouter';

export const routes = Router();

routes.use("/products",productRouter)
routes.use("/users",userRouter)
routes.use("/sessions",sessionsRouter)
routes.use("/password",passwordRouter)
