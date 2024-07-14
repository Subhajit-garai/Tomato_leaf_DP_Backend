import express from "express";
import {  UserLogIn, UserLogout, creatNewUser, getAllUsers, sendAuthorizeUserData } from "../controller/user.controller.js";
import {IsUserAuthorize, authorizeRoles} from "../middlewares/auth.middleware.js"
const User = express.Router()


User.route('/signup').post(creatNewUser)
User.route('/login').post(UserLogIn )
User.route('/logout').get( UserLogout)
User.route('/auth').get(IsUserAuthorize,sendAuthorizeUserData)

// admin routes
// User.route('/admin/users').get(IsUserAuthorize,authorizeRoles("admin"),getAllUsers)

export default User