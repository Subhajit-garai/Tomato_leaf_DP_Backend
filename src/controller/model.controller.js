import axios from "axios"
import formdata from "form-data"
import fs from "fs"
import { uploadOnCloudinary } from "../middlewares/cloudinary.middleware.js"
import { Prediction } from "../models/prediction.model.js"

export const predictions = async (req, res) => {

    let localPath;

    if (req.user.role === 'admin') {
        localPath = 'uploads/admin';
    } else if (req.user.role === 'user') {
        localPath = `uploads/user/${req.user._id}`;
    } else {
        localPath = 'uploads/others';
    }
    if(!fs.readdirSync(localPath)){
        fs.mkdirSync(localPath)
    }
    let files = fs.readdirSync(localPath)
    
    files.forEach(async (file) => {
        let path = `${localPath}/${file}`
        let imageData = fs.createReadStream(path);
        let data = await imagepredictions(imageData)
        //  upload to db
        fileUpload(data, req, res, path)
    });

    return res.json({ success: true, message: "file saved successfuly" })

}

const imagepredictions = async (imageData) => {
    const form = new formdata();
    form.append("file", imageData);

    const response = await axios.post(`${process.env.MODEL_URL}/predict`, form, {
        headers: {
            ...form.getHeaders()
        }
    })
    return response.data;
}

export const fileUpload = async (data, req, res, path) => {
    // file upload to cloudnary
    let cloudnaryUrl = await uploadOnCloudinary(path);

    if (cloudnaryUrl) {
         try {
            await Prediction.create({userid:req.user._id,prediction:{class:data.class,confidence:data.confidence},imageadd:cloudnaryUrl})
            
         } catch (error) {
            console.log("Error in file upload to db --->",error);
         }

    }
}