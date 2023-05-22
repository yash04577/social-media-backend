import express from "express"
import multer from "multer";
import { createPost, deletePost, getPost, getTimelinePosts, likePost, updatePost } from "../controller/PostController.js";
import postModel from "../models/postSchema.js";
import {uploadImage} from "../utils/uploadImageToCloudinary.js"
const router = express.Router();

let storage = multer.diskStorage({})
let upload = multer({ storage }).single("myFile");

router.post("/", upload, async (req, res) => {

  try {
    const file = req.file
    const {userId, desc, name, profilePicture} = req.body;
    if (file) {

      const response = await uploadImage(file);

      const newPost = postModel.create({
        userId,
        desc,
        image : response.secure_url,
        name,
        profilePicture
      })

      const savePost =  await newPost.save();
      return res.status(200).json(savePost)
    }
    else{
      const newPost = postModel.create({
        userId,
        desc,
        name,
        profilePicture
      })

      const savePost =  await newPost.save();
      return res.status(200).json(savePost)
    }
    
  } catch (error) {
    res.json({error:error})
  }

})

// router.post("/", upload.single("myFile") , createPost);
router.get("/:id", getPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.put("/:id/like", likePost);
router.get("/:id/timeline", getTimelinePosts);



export default router;