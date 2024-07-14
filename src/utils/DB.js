import mongoose from "mongoose";

export const Dbconnection =  async () => {
 
    try{
        await mongoose.connect(process.env.DB_URL ,{
            dbName: "TomatoDisease"
        })
        .then(()=> console.log("DB connection successful"))
    }
    catch(err){
        console.log(err)
    }
}