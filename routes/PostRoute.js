import express from "express"
import multer from "multer";
import { createPost, deletePost, getPost, getTimelinePosts, likePost, updatePost } from "../controller/PostController.js";
import postModel from "../models/postSchema.js";

const router = express.Router();

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads') 
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  })
   
let upload = multer({storage})



router.post("/", upload.single('myFile') , async(req, res)=>{
    const file = req.file
    console.log('file ', file)
    if(file){
        req.body.image = file.filename;
    }
    const newPost = new postModel(req.body);
    try {
        await newPost.save();
        res.status(200).json("post created")
    } catch (error) {
        // res.status(500).json("server error")
        res.status(500).json(error)
    }
 
})

// router.post("/", upload.single("myFile") , createPost);
router.get("/:id", getPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.put("/:id/like", likePost);
router.get("/:id/timeline", getTimelinePosts);



export default router;