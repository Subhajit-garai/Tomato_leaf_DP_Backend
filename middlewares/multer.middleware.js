import multer from "multer"
import fs from "fs"
// import path from "path";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      let uploadPath;

      // Example logic to determine upload path
      if (req.body.userType === 'admin') {
        uploadPath = 'uploads/admin';
      } else if (req.body.userType === 'user') {
        uploadPath =  `uploads/user/${req.user._id}`;
      } else {
        uploadPath = 'uploads/others';
      }
  
      // Ensure the directory exists
      fs.mkdirSync(uploadPath, { recursive: true });
  
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname )
    }
  })
  
export const upload = multer({ storage: storage })