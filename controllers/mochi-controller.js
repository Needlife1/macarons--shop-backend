import { Mochi } from "../models/product-model.js";
import { ctrlWrapper, HttpError, getPublicIdFromUrl } from "../helpers/index.js";
import * as fs from "node:fs/promises";
import { cloudinary } from "../helpers/index.js";



const getAll = async(req, res)=>{
    const {page = 1, limit = 10}= req.query;
    const skip = (page - 1) * limit

    const result = await Mochi.find({}, null, {skip, limit});
    res.json(result);
}

const getById = async (req, res)=>{
    const {id}=req.params;
    const result = await Mochi.findById(id);
   
    if (!result) {
        throw HttpError(404, 'Not found');
    }
    res.json(result);
}

const addNew = async (req,res)=>{
    const {path:tempUpload} = req.file;
   
    const result = await cloudinary.uploader.upload(tempUpload, {
        folder:'productImg'
    });

    await fs.unlink(tempUpload);
  
   const productData = {
       ...req.body,
       productImg: result.secure_url,
    };

    const newProduct = await Mochi.create(productData);
    res.status(201).json(newProduct);
}

const updateById = async (req, res)=>{
    const {id} = req.params;
    const existingProduct = await Mochi.findById(id);
    if (!existingProduct) {
        throw HttpError(404, 'Not found');
    };

    let productImgURL = existingProduct.productImg;

    if (req.file) {
        const {path:tempUpload} = req.file;
        const result = await cloudinary.uploader.upload(tempUpload, {
            folder:'productImg'
        });

        if (result && existingProduct.productImg) {
            const publicId = getPublicIdFromUrl(existingProduct.productImg);
            await cloudinary.uploader.destroy(publicId);
        }

        if (productImgURL) {
            try {
                await fs.unlink(tempUpload);
            } catch (error) {
                console.error(`Failed to delete old image: ${error.message}`);
            }
        }
            productImgURL = result.secure_url;
    }

    const productData = {
        ...req.body,
        productImg: productImgURL,
    };

    const result = await Mochi.findByIdAndUpdate(id, productData, {new:true});

    if (!result) {
        throw HttpError(404, 'Not found');
    }
    res.json(result);
}

const deleteById = async (req,res)=>{
const {id} = req.params;

const existingProduct = await Mochi.findById(id);
    if (!existingProduct) {
        throw new HttpError(404, 'Not found');
    }

const result = await Mochi.findByIdAndDelete(id);

if (result && existingProduct.productImg) {
    const publicId = getPublicIdFromUrl(existingProduct.productImg);
    await cloudinary.uploader.destroy(publicId);
}

res.json({
    message: 'Delete success'
})
} 

export const controllers = {
    getAll:ctrlWrapper(getAll),
    getById:ctrlWrapper(getById),
    addNew:ctrlWrapper(addNew),
    updateById:ctrlWrapper(updateById),
    deleteById:ctrlWrapper(deleteById)
}