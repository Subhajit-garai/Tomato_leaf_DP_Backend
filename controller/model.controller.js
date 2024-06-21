import axios from "axios"
import formdata from "form-data"
import fs from "fs"
import path from "path"


export const predictions = async (req, res) => {

    const localPath = req.path
    // let files = fs.readdirSync(localDirPath)
    // res.send({ message: "success" })

    const imageData = fs.createReadStream(localPath);
    const form = new formdata();
    form.append("file", imageData);

    const response = await axios.post(`${process.env.MODEL_URL}/predict`, form, {
        headers: {
            ...form.getHeaders()
        }
    }).then((res) => {
        fs.unlink(localPath, (err) => { if (err) { console.log(err); } })
        return res
    })

    res.send({ message: "success", data: response.data })
}


export const fileUpload = (req, res) => {
    if (req.file.path) { res.json({ success: true ,path:req.file.path}) }
}