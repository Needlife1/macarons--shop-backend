import multer from "multer";
import * as path from "node:path";
import * as crypto from 'node:crypto';

const multerConfig = multer.diskStorage({
    destination(req,res,cb){
       cb(null, path.join(process.cwd(), 'temp')) 
    }, 
    filename(req,file,cb){
        const extname = path.extname(file.originalname);
        const basename = path.basename(file.originalname, extname);
        const suffix = crypto.randomUUID();
        cb(null, `${basename}-${suffix}${extname}`)
    }
});

export const upload = multer({
    storage: multerConfig,
})