import express from 'express';
import {upload} from "../middlewares/multer.middleware.js"
import { predictions ,fileUpload} from '../controller/model.controller.js';

const model = express.Router()

model.route("/upload").post(upload.single("file"),fileUpload);
model.route("/predict").get(predictions)

export default model