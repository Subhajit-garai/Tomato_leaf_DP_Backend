import { v2 as cloudinary } from "cloudinary"
import fs from "fs"


// cloudinary.config({
//     cloud_name:`${process.env.CLOUDINARY_cloud_name}`,
//     api_key:  `${process.env.CLOUDINARY_API_KEY}`,
//     api_secret:`${process.env.CLOUDINARY_SECREACT}`, // Click 'View Credentials' below to copy your API secret
// });

cloudinary.config({ 
    cloud_name: 'dqux1r0xo', 
    api_key: '812864855412443', 
    api_secret: 'ZM4xxD9Om8fQAbMKgZouEPHvCNo' // Click 'View Credentials' below to copy your API secret
});

export const uploadOnCloudinary = async (loaclPath) => {
    try {
       
        if (!loaclPath) return null;
        let response = await cloudinary.uploader.upload(loaclPath, {
            resource_type: "auto",
        })
        return response.url;
    }
    catch (err) {
        console.error('Error uploading to Cloudinary:', err);
    } finally {
        // Delete the local file after the upload attempt
        try {
              fs.unlinkSync(loaclPath);
        } catch (unlinkErr) {
            console.error('Error deleting local file:', unlinkErr);
        }
    }
}


