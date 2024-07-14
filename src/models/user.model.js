import mongoose from 'mongoose';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    phone:{
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        default: null
    },
    avater: {
        type: String,
        default: 'user_avater',
        // required: true,
    },
    role: {
        type: String,
        required: true,
        default: 'user',
    }


}, { timestamps: true });
UserSchema.methods.generateToken = function () {
    let data = {
        UID: this._id
    }
    return jwt.sign(data, process.env.PRIVATEKEY, { expiresIn: process.env.JWT_EXPIRE });
}

UserSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified("password")) {
        next()
    }
    try {
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;
    } catch (error) {
        next(error)
    }
})


 export const User = mongoose.model('User', UserSchema);