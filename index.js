import express, { urlencoded } from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import AuthRoute from "./routes/AuthRoute.js"
import UserRoute from "./routes/UserRoute.js"
import PostRoute from "./routes/PostRoute.js"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"
import UploadController from "./controller/UploadController.js"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
import chatRoute from "./routes/chatRoute.js"
import messageRoute from "./routes/messageRoute.js"


const app = express();
app.use(cors());

app.use(bodyParser.json({limit:"30mb", extended:true}));
app.use(express.urlencoded({extended: false}));
// app.use(bodyParser.urlencoded({limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://yash04577:yash04577@cluster0.kcrap8f.mongodb.net/test", 
{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{app.listen(8000, ()=>{console.log("listinig at port")})}).catch(err=>console.log(err))

app.use("/images", express.static(path.join(__dirname, "/uploads")));
app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/post", PostRoute)
app.use("/upload", UploadController);
app.use("/chat", chatRoute)
app.use("/message", messageRoute)

app.get("/image/:name", async(req, res)=>{
    const name = req.params.name;
    try {
        console.log("inside image")
        res.status(200).json(import(`./uploads/${name}`))
    } catch (error) {
        res.status(404).json(error)
    }
})
