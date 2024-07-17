import express from "express";
import { validateBody } from "../helpers/index.js";
import { controllers } from "../controllers/macaron-controller.js";
import { addSchema } from "../models/product-model.js";
import {isValidId, authenticate}from '../middlewares/index.js'

export const macaronsRoute = express.Router();

macaronsRoute.get('/', controllers.getAllMacarons);

macaronsRoute.get('/:id', isValidId, controllers.getById);

macaronsRoute.post('/',authenticate, validateBody(addSchema), controllers.addMacaron);

macaronsRoute.put('/:id',authenticate, isValidId, validateBody(addSchema), controllers.updateById);

macaronsRoute.delete('/:id',authenticate, isValidId, controllers.deleteById);