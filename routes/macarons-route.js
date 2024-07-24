import express from "express";
import { validateBody } from "../helpers/index.js";
import { controllers } from "../controllers/macaron-controller.js";
import { addSchema } from "../models/product-model.js";
import {isValidId, authenticate, upload}from '../middlewares/index.js'


export const macaronsRoute = express.Router();

macaronsRoute.get('/', controllers.getAll);

macaronsRoute.get('/:id', isValidId, controllers.getById);

macaronsRoute.post('/',authenticate, upload.single('productImg'), validateBody(addSchema), controllers.addNew);

macaronsRoute.put('/:id',authenticate, isValidId, upload.single('productImg'), validateBody(addSchema), controllers.updateById);

macaronsRoute.delete('/:id',authenticate, isValidId, controllers.deleteById);
