import { Macaron } from "../models/product-model.js";
import { ctrlWrapper, HttpError } from "../helpers/index.js";

const getAllMacarons = async(req, res)=>{
    const {page = 1, limit = 10}= req.query;
    const skip = (page - 1) * limit

    const result = await Macaron.find({}, null, {skip, limit});
    res.json(result);
}

const getById = async (req, res)=>{
    const {id}=req.params;
    const result = await Macaron.findById(id);
   
    if (!result) {
        throw HttpError(404, 'Not found');
    }
    res.json(result);
}

const addMacaron = async (req,res)=>{
const result = await Macaron.create(req.body);
res.status(201).json(result);
}

const updateById = async (req, res)=>{
    const {id} = req.params;
    const result = await Macaron.findByIdAndUpdate(id, req.body, {new:true});

    if (!result) {
        throw HttpError(404, 'Not found');
    }
    res.json(result);
}

const deleteById = async (req,res)=>{
const {id} = req.params;
const result = await Macaron.findByIdAndDelete(id);

if (!result) {
    throw HttpError(404, 'Not found');
}

res.json({
    message: 'Delete success'
})
} 

export const controllers = {
    getAllMacarons:ctrlWrapper(getAllMacarons),
    getById:ctrlWrapper(getById),
    addMacaron:ctrlWrapper(addMacaron),
    updateById:ctrlWrapper(updateById),
    deleteById:ctrlWrapper(deleteById),
}