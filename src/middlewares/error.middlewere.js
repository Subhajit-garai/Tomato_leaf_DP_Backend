import errHandler from "../utils/errHandler.js";

export const errorMiddleware=(err,req,res,next)=>{

 const status = err.statusCode || 500;
 const message = err.message || "BECKEND ERROR"

 return res.status(status).json({success:false,message:message})
}