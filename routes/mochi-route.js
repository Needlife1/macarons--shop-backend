import express from "express";
import { validateBody } from "../helpers/index.js";
import { controllers } from "../controllers/mochi-controller.js";
import { addSchema } from "../models/product-model.js";
import {isValidId, authenticate, upload}from '../middlewares/index.js'

export const mochiRoute = express.Router();

mochiRoute.get('/', controllers.getAll);

mochiRoute.get('/:id', isValidId, controllers.getById);

mochiRoute.post('/',authenticate, upload.single('productImg'), validateBody(addSchema), controllers.addNew);

mochiRoute.put('/:id',authenticate, isValidId, upload.single('productImg'), validateBody(addSchema), controllers.updateById);

mochiRoute.delete('/:id',authenticate, isValidId, controllers.deleteById);