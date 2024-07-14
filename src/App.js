import express from "express"
import dotenv from "dotenv"
import  userRouter  from "./routers/user.router.js"
import  modelRouter  from "./routers/model.router.js"
import  surviceRouter  from "./routers/services.router.js"
import cookieParser from "cookie-parser";
import cors from "cors"




dotenv.config()
export const app = express()
const corsOptions ={
    origin: ["http://localhost:5173"],
    method:[ "GET", "HEAD", "OPTIONS", "POST", " DELETE", " PATCH"],
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions))

// from demo backend
app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(cookieParser());



//  routes

app.get('/health',(req,res)=>{res.status(200).json({success:true, message:"server health ok"})})
app.use("/api/v1/users",userRouter)
app.use("/api/v1/models",modelRouter)
app.use("/api/v1/services",surviceRouter)
