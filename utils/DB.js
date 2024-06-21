import mongoose from "mongoose";

export const Dbconnection =  async () => {
 
    try{
        await mongoose.connect(process.env.DB_URL ,{dbName:"TomatoDesies"})
    }
    catch(err){
        console.log(err)
    }
}