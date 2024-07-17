import express from "express";
import { validateBody } from "../helpers/index.js";
import { addSchema } from "../models/product-model.js";
import {isValidId}from '../middlewares/index.js'

export const mochiRoute = express.Router();

mochiRoute.get('/');

mochiRoute.get('/:id', isValidId);

mochiRoute.post('/', validateBody(addSchema));

mochiRoute.post('/:id',isValidId, validateBody(addSchema));

mochiRoute.delete('/:id', isValidId);