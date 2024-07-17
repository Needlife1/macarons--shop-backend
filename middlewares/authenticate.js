import  jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { HttpError } from "../helpers/index.js";
import { Admin } from "../models/admin-model.js";

dotenv.config();

const {JWT_SECRET}=process.env;

export const authenticate = async (req, res, next)=>{
const {authorization = ''} = req.headers;
const [bearer, token] = authorization.split(" ");
if (bearer !== 'Bearer') {
    next(HttpError(401));
}

try {
    const {id}= jwt.verify(token, JWT_SECRET);
    const admin = await Admin.findById(id);
    if (!admin || !admin.token || admin.token !== token) {
        next(HttpError(401));
    }

  next();

} catch (error) {
    next(HttpError(401));
}

}