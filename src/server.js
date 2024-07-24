import { app } from "./App.js";
import { Dbconnection } from "./utils/DB.js";
import {errorMiddleware} from "./middlewares/error.middlewere.js"
import axios from "axios";
// 


app.use(errorMiddleware);


  
Dbconnection().then(()=>{
    app.listen(process.env.PORT || 4000, console.log("surver listen on port ", process.env.PORT))
    console.log("model server",process.env.MODEL_URL);
})
