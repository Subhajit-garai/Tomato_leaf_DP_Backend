import cors from "cors"
import { app } from "./App.js";
import { Dbconnection } from "./utils/DB.js";
// 

const corsOptions ={
    origin: ["http://localhost:5173"],
    method:[ "GET", "HEAD", "OPTIONS", "POST", " DELETE", " PATCH"],
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions))



Dbconnection().then(()=>{
    app.listen(process.env.PORT, console.log("surver listen on port ", process.env.PORT))
})
