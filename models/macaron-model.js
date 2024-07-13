import { Schema, model } from "mongoose";
import { handleMongooseError } from "../helpers/index.js";
import  Joi  from "joi";

const macaronSchema = new Schema({
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

},{ versionKey: false, timestamps:true });

macaronSchema.post('save',handleMongooseError );

export const addSchema = Joi.object({
   title:Joi.string().required(),
   price:Joi.string().required(),
   description:Joi.string().required(),
   weight:Joi.string().required(),

})


export const Macaron = model("macaron", macaronSchema);