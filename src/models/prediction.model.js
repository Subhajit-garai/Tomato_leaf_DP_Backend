import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema({

    prediction:{
        class:{
            type:String,
            required:true,
        },
        confidence:{
            type:String,
            required:true,
        }
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    imageadd:{
        type:String,
        required:true,
    },

},{timestamps:true})

export const Prediction = mongoose.model('Prediction',predictionSchema);