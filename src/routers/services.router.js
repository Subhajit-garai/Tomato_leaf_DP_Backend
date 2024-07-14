import express from 'express';
import { diseaseinfoAdd, getAlldiseaseinfo, getAllHistory ,getDiseaseinfo} from '../controller/services.controller.js';
import {IsUserAuthorize, authorizeRoles} from "../middlewares/auth.middleware.js"

const survice = express.Router()

survice.route("/history").get(IsUserAuthorize,getAllHistory)

survice.route("/diseaseinfo").get(IsUserAuthorize,getDiseaseinfo)

survice.route("/alldiseaseinfo").get(IsUserAuthorize,getAlldiseaseinfo)
survice.route("/diseaseinfoAdd").post(IsUserAuthorize,authorizeRoles("admin"),diseaseinfoAdd)

export default survice

