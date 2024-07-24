import express from "express";
import { validateBody } from "../helpers/index.js";
import { addSchema } from "../models/product-model.js";
import {isValidId, authenticate, upload}from '../middlewares/index.js'
import { controllers } from "../controllers/other-controller.js";


export const otherRoute = express.Router();

otherRoute.get('/', controllers.getAll);

otherRoute.get('/:id', isValidId, controllers.getById);

otherRoute.post('/',authenticate, upload.single('productImg'), validateBody(addSchema), controllers.addNew);

otherRoute.put('/:id',authenticate, isValidId, upload.single('productImg'), validateBody(addSchema), controllers.updateById);

otherRoute.delete('/:id',authenticate, isValidId, controllers.deleteById);