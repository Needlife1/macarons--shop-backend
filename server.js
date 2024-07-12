import mongoose from "mongoose";
import app from "./app.js";

const DB_HOST = 'mongodb+srv://Max:cUDoxCmpFPaT42Uz@cluster0.mdbk2e9.mongodb.net/macarons--shop?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(DB_HOST)
    .then(() => {
        app.listen(4000)
    })
    .catch(error => {
        console.log(error.message);
        process.exit(1);
    })