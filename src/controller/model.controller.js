import axios from "axios"
import formdata from "form-data"
import fs from "fs"
import { uploadOnCloudinary } from "../middlewares/cloudinary.middleware.js"
import { Prediction } from "../models/prediction.model.js"
import errHandler from "../utils/errHandler.js"

export const predictions = async (req, res, next) => {

    //path selaction
    let localPath;

    if (req.user.role === 'admin') {
        localPath = 'uploads/admin';
    } else if (req.user.role === 'user') {
        localPath = `uploads/user/${req.user._id}`;
    } else {
        localPath = 'uploads/others';
    }
    if (!fs.readdirSync(localPath)) {
        fs.mkdirSync(localPath)
    }
    
    //  reading file for images 

    let files = fs.readdirSync(localPath)

    let status = await processFiles(files,localPath,req);

    if (status) {
        if (status.every(Boolean)) {
            res.status(200).json({ message: "All images processed" })
        } else {
            res.status(400).json({ message: "Some images not processed" })
        }
    } else {
        next(new errHandler("model not online ", "500"))
    }


}

async function processFiles(files,localPath,req) {
    const status = [];

    for (const file of files) {
        const path = `${localPath}/${file}`;
        try {
            const info = await imagepredictions(path);
            const flag = await fileUpload(info, req, path);
            if (flag) {
                status.push(info || null);
            }
        } catch (error) {
            console.error(`Error processing file ${file}:`, error);
        }
    }
    if (!status.length > 0) {return null}
    return status
}


const imagepredictions = async (path) => {
    try {

        let imageData = fs.createReadStream(path);
        const form = new formdata();
        form.append("file", imageData);

        const response = await axios.post(`${process.env.MODEL_URL}/predict`, form, {
            headers: {
                ...form.getHeaders()
            }
        })
        return response.data;
    } catch (error) {
        return null;
    }
}

export const fileUpload = async (data, req, path) => {

    // file upload to cloudnary

    let cloudnaryUrl = await uploadOnCloudinary(path);
    if (!data) { return null; }
    
    // store image and predictions in to mongo db

    if (cloudnaryUrl) {
        try {
            await Prediction.create({ userid: req.user._id, prediction: { class: data.class, confidence: data.confidence }, imageadd: cloudnaryUrl })
            return 1;
        } catch (error) {
            console.log("Error in file upload to db --->", error);
            return -1;
        }

    }
}