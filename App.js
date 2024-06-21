import express from "express"
import dotenv from "dotenv"
import  userRouter  from "./routers/user.router.js"
import  modelRouter  from "./routers/model.router.js"


dotenv.config()
export const app = express()


app.use("/api/v1/users",userRouter)
app.use("/api/v1/model",modelRouter)
// app.use("/api/v1/users",userRouter)