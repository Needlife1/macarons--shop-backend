import express from "express";
import { validateBody } from "../helpers/index.js";
import { addSchema } from "../models/product-model.js";
import {isValidId}from '../middlewares/index.js'


export const otherRoute = express.Router();

otherRoute.get('/');

otherRoute.get('/:id', isValidId);

otherRoute.post('/', validateBody(addSchema));

otherRoute.post('/:id', isValidId, validateBody(addSchema));

otherRoute.delete('/:id', isValidId);