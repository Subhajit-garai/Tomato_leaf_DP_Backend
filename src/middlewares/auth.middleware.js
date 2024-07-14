
import { User } from "../models/user.model.js";
import errHandler from "../utils/errHandler.js";
import jwt from "jsonwebtoken";


export const IsUserAuthorize = async (req, res, next) => {

    try {
        const {token} = req.cookies;
        if(!token){
          return  next(new errHandler("Please Log in to access this resource ",401));
        }
        let decodedData = jwt.verify(token, process.env.PRIVATEKEY) 
        req.user=await User.findById(decodedData.UID)
        next();
    } catch (error) {
        next(new errHandler(error));
    }

}

export const authorizeRoles=(...roles)=>{

    return (req,res,next) => {
        if(!roles.includes(req.user.Role)){
           return next( new errHandler(`ROLE:${req.user.Role} is not allowed to  access this resouce`,403));
        }
        next();
    }
}