import express from "express";
import { validateBody } from "../helpers/index.js";
import { adminLoginSchema } from "../models/admin-model.js";
import { adminController } from "../controllers/admin-controller.js";
import { authenticate}from '../middlewares/index.js'

export const adminRoute = express.Router();

adminRoute.post('/login', validateBody(adminLoginSchema), adminController.loginAdmin);

adminRoute.post('/logout', authenticate, adminController.logoutAdmin)