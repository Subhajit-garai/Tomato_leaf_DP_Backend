

import mongoose from "mongoose";

const diseaseSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true,
    },
    images:
    [
        {
            type: String,
            required: true,
        }, 
    ] ,
    Cause:
   [ {
        type: String,
        // required: true,
    }],
    Symptoms:
   [ {
        type: String,
        // required: true,
    }],
    Treatment:
    [{
        type: String,
        // required: true,
    }],
    Do:
    [{
        type: String,
        // required: true,
    }],
    Do_Not: [{
        type: String,
        // required: true,
    }],
   
}, { timestamps: true });

export const disease = mongoose.model('disease', diseaseSchema);

