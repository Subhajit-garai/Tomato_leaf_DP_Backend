import express from 'express';
import {upload} from "../middlewares/multer.middleware.js"
import { predictions ,fileUpload} from '../controller/model.controller.js';
import {IsUserAuthorize, authorizeRoles} from "../middlewares/auth.middleware.js"

const model = express.Router()

model.route("/upload").post(IsUserAuthorize,upload.single("file"),(req,res)=>  res.json({ success: true, message: "file saved successfuly" }) )

model.route("/predict").get(IsUserAuthorize,predictions)

export default model

