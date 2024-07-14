import axios from "axios";
import { disease } from "../models/disease.model.js";
import { Prediction } from "../models/prediction.model.js";


export const getAllHistory = async(req, res) =>{
  let user = req.user._id;
  let userHistory = await Prediction.find({userid:user})
  res.send({success: true, data: userHistory })
}
export const getAlldiseaseinfo = async(req, res) =>{
  let user = req.user._id;
  let userHistory = await disease.find({})
  res.send({success: true, data: userHistory })
}
export const getDiseaseinfo = async(req, res) =>{
  // let user = req.user._id;
  // let userHistory = await Prediction.find({userid:user})
  // res.send({success: true, data: userHistory })
}

export const diseaseinfoAdd = async(req, res) =>{
  let user = req.user._id;
  let data = req.body;
  let keys= Object.keys(data);

 keys.forEach(async(key)=>{
 let url =`https://812864855412443:ZM4xxD9Om8fQAbMKgZouEPHvCNo@api.cloudinary.com/v1_1/dqux1r0xo/resources/image/upload?prefix=leafimages/Tomato___${key}/&max_results=5"`
 let datas = await axios.get(url);
 let images=[]
 let d =datas.data;
  d.resources.map((r)=>{
    images.push(`https://res.cloudinary.com/dqux1r0xo/image/upload/v1720232287/${r.public_id}`)
  })
      await disease.create({name:key,
        images:images,
        Cause:data[key].Cause,
        Symptoms:data[key].Symptoms,
        Treatment:data[key].Treatment,
        Do:data[key].Do,
        Do_Not:data[key].Do_Not,
      })
      .catch(err=>{ console.log("from disease service controler",err) })

      
 })

  res.send({success: true, data: "datas" })
}
