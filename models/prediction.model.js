import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema({

    prediction:{
        type:String,
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    image:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'image',
        required:true,
    },

},{timestamps:true})

export const Prediction = mongoose.model('Prediction',predictionSchema);