

import mongoose from "mongoose";

const diseaseQureSchema = new mongoose.Schema({
    info:
    {
        type: String,
        required: true,
    },
}, { timestamps: true });

export const diseaseQure = mongoose.model('diseaseQure', diseaseQureSchema);

