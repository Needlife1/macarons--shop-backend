import express from "express";
import { validateBody } from "../helpers/index.js";
import { controllers } from "../controllers/macaron-controller.js";
import { addSchema } from "../models/macaron-model.js";
import {isValidId}from '../middlewares/index.js'

export const macaronsRoute = express.Router();

macaronsRoute.get('/', controllers.getAllMacarons);

macaronsRoute.get('/:id', isValidId, controllers.getById);

macaronsRoute.post('/', validateBody(addSchema), controllers.addMacaron);

macaronsRoute.put('/:id', isValidId, validateBody(addSchema), controllers.updateById);

macaronsRoute.delete('/:id', isValidId, controllers.deleteById);