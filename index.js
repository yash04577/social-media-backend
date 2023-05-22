import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import AuthRoute from "./routes/AuthRoute.js"
import UserRoute from "./routes/UserRoute.js"
import PostRoute from "./routes/PostRoute.js"
import cors from "cors"
import chatRoute from "./routes/chatRoute.js"
import messageRoute from "./routes/messageRoute.js"
import { connectCloudinary } from "./config/cloudinary.js"
import multer from "multer"
import { uploadImage } from "./utils/uploadImageToCloudinary.js"
const app = express();
app.use(cors());

app.use(bodyParser.json({limit:"30mb", extended:true}));
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
connectCloudinary();

let storage = multer.diskStorage({})
let upload = multer({ storage }).single("myFile");

mongoose.connect("mongodb+srv://yash04577:yash04577@cluster0.kcrap8f.mongodb.net/test", 
{useNewUrlParser: true, useUnifiedTopology: true}).
then(()=>{
    app.listen(8000, ()=>{
        console.log("listinig at port")}
    )})
.catch(err=>console.log(err))

app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/post", PostRoute);
app.use("/chat", chatRoute)
app.use("/message", messageRoute)

app.post("/upload", upload , async(req, res)=>{
    try {
        const file = req.file
        const response = await uploadImage(file);
        res.status(200).json(response.secure_url);
    } catch (error) {
        res.status(500).json(error);
    }
})


