import { User } from "../models/user.model.js"
import errHandler from "../utils/errHandler.js";
import { SendToken } from "../middlewares/SendToken.middleware.js";
import bcrypt from "bcrypt"

export const creatNewUser = async (req,res,next) => {
    const user = req.body;

    const isexist = await User.findOne({ email: user.email })
    if (isexist) {
        return res.status(200).json({ success:false, message: "User esist" })
    }
     try {
        const userData = await User.create(user)
        let isUserCreated = await User.findOne({ email: user.email }).select("-password -refreshToken ");  
        if(isUserCreated){
          SendToken(userData,201,res,`${userData.name} Registraton successfull`) 
        }
     } catch (error) {
        next(new errHandler(error,404))
     }

}


export const UserLogIn = async (req, res,next) => {
  try {
    let { email, password } = req.body

    console.log(req.body);
    let user = await User.findOne({ email: email }).select("+password");  
    if (!user) {
        return res.status(401).json({success:false, message: "invalid Email " })
    }
    let isPasswordMatch = await bcrypt.compare(password,user.password)
    if (isPasswordMatch) {
         
         SendToken(user,200,res, "Login Sucsessfull")  
    } else {
        res.status(401).json({success:false, message: "invalid credentials " })
    }

  } catch (error) {
    next(new errHandler(error,404))
  }
}

export const  UserLogout =async (req,res,next)=>{
 try {
  res.cookie("token",null,{
    expires:new Date(Date.now()),
    httpOnly:true
  })
    
  res.status(200).json({
    success:true,
    message:"Logged out"
  })
 } catch (error) {
  next(new errHandler(error))
 }
}

export  const sendAuthorizeUserData = async (req,res,next)=>{
  try {
    let data ={
      isLogIn:false,
      isAdmin:false,
      user:{
        avater:req.user.Avater,
        name:req.user.Name, 
      }
    }
     if(req.user.Role =="admin"){
      data.isAdmin =true;
     }
     if(req.user){ data.isLogIn=true;}
    res.status(200).json({success:true,data:data});
  } catch (error) {
    next(new errHandler(error))
  }
}

// admin
export const getAllUsers = async(req,res,next)=>{
 try {
  const user= await User.find({})
  res.status(200).json({success:true,user:user});
 } catch (error) {
  next(new errHandler(error))
 }
}
