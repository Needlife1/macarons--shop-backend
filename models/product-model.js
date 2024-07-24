import { Schema, model } from "mongoose";
import { handleMongooseError } from "../helpers/index.js";
import  Joi from "joi";

const productSchema = new Schema({
 title:{
    type:String,
    require:true,

 },
 price:{
    type:Number,
    require:true,

 },
 description:{
    type:String,
    require:true,

 },
 weight:{
    type:Number,
    require:true,

 },
 productImg:{
 type: String,
 require:true,
 
 }

},{ versionKey: false, timestamps:true });

productSchema.post('save',handleMongooseError );

export const addSchema = Joi.object({
   title:Joi.string().required(),
   price:Joi.string().required(),
   description:Joi.string().required(),
   weight:Joi.string().required(),
})


export const Macaron = model("macaron", productSchema);
export const Mochi = model("mochi", productSchema);
export const Other = model("other", productSchema);