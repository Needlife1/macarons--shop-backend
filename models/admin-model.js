import { Schema, model } from "mongoose";
import { handleMongooseError } from "../helpers/index.js";
import Joi from "joi";

const adminSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    token:{
        type: String,
        default: ''
    }
}, {
    versionKey: false,
    timestamps: true
});

adminSchema.post('save', handleMongooseError);

export const adminLoginSchema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required()
});

export const Admin = model("admin", adminSchema);