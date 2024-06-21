import fs from "fs"
import path from "path"
import { fileURLToPath } from 'url';
import sharp from 'sharp';

// Convert import.meta.url to __filename
const __filename = fileURLToPath(import.meta.url);
// Convert __filename to __dirname
const __dirname = path.dirname(__filename);

const folderepath = path.join(__dirname, "images")
const imagepath = path.join(folderepath, "image1.jpeg")

// console.log(imagepath);

export const ImageProcessor =(buffer)=>{
    // console.log(buffer);
    let imagedata 

    sharp(buffer)
    .raw()
    .toBuffer((err, data, info) => {
        if (err) {
            console.error('Error processing image:', err);
            return;
        }
        console.log('Image data:', data); // Image data as a Buffer
        console.log('Image info:', info); // Image metadata (e.g., width, height, channels)
        imagedata = data;
    });
    fs.writeFile(imagepath,imagedata ,(err) => {
        if (err) {
            console.error('Error writing the image file:', err);
            return;
        }
        console.log('Image file created successfully:', imagepath);
    });

}