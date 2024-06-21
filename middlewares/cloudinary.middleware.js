import {v2 as cloudinary } from "cloudinary"
import fs from "fs"

let url =  `CLOUDINARY_URL=cloudinary://${process.env.CLOUDINARY_APIKEY}:${process.env.CLOUDINARY_SECREACT}@dqux1r0xo`


const uploadOnCloudinary = async(loaclPath) =>{
    try{
 
        if(loaclPath) return null ;
        let response = cloudinary.uploader.upload(loaclPath,{
            resource_type: "auto",
        })
        return response;
    }
    catch(err){
        fs.unlinkSync(loaclPath)
        console.log(err)
    }
}