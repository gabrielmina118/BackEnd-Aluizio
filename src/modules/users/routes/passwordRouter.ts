import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import ForgotPasswordController from "../controllers/ForgotPasswordController";

export const passwordRouter = Router();

const forgotPasswordController = new ForgotPasswordController();

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required()
    },
  }),
  forgotPasswordController.create,
);
