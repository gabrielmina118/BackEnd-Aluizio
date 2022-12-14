import { config } from 'dotenv';
import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { routes } from './routes';
import BaseError from '../../errors/BaseError';
import '../typeorm';
import { errors } from 'celebrate';
import { pagination } from 'typeorm-pagination';
import uploadConfig from '../../../config/multer/upload';
import rateLimiter from './middlewares/rateLimiter';

config();
const app = express();
app.use(pagination);

app.use(cors());
app.use(express.json());

app.use(rateLimiter);

app.use('/files', express.static(uploadConfig.directory));

// middleware de rotas
app.use(routes);

app.use(errors());

// middleware de error
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof BaseError) {
    return res.status(error.statusCode).json({ message: error.message });
  }
  console.log(error);

  return res.status(500).send({ message: 'Internal server error' });
});

app.listen(3003, () => {
  console.log(`Server is runnning on port ${process.env.APP_API_URL}`);
});

