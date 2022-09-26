import {Router } from 'express';
import { productRouter } from '../../../modules/products/routes/productRouter';

export const routes = Router();

routes.use("/products",productRouter)
