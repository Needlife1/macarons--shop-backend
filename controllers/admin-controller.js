import {Admin}from "../models/admin-model.js";
import { ctrlWrapper, HttpError } from "../helpers/index.js";
import dotenv from "dotenv";
import  jwt from "jsonwebtoken";
import  bcrypt  from "bcryptjs";

dotenv.config(); 

const {JWT_SECRET, ADMIN_ID}=process.env;

const loginAdmin = async(req,res)=>{
// const {name, password} = req.body;
// const result = await bcrypt.hashSync(password, 10);
// const newAdmin = await Admin.create({...req.body, password:result});
// res.status(201).json({
//     name:newAdmin.name,
//     password:newAdmin.password,}
// )

 const {name, password} = req.body;

 const admin = await Admin.findOne({ name });
if (!admin) {
    throw HttpError(401, "Name or password invalid")
}

const passwordCompare = await bcrypt.compare(password, admin.password);
if (!passwordCompare) {
    throw HttpError(401, "Name or password invalid")
}

const payload = {
    id: admin._id,
}

const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "23h"});
await Admin.findByIdAndUpdate(admin._id, {token})

res.json({
    token,
})
}

const logoutAdmin = async(req,res)=>{

await Admin.findByIdAndUpdate({ _id:ADMIN_ID}, {token: ''});

res.json({
    message: 'Logout success',
})
}

export const adminController = {
    loginAdmin:ctrlWrapper(loginAdmin),
    logoutAdmin:ctrlWrapper(logoutAdmin),
}