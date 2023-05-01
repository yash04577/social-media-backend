import express from "express"
// import { getUser } from "../controller/UserController";
import { deleteUser, followUser, getUser, updateUser, unFollowUser, getUserByUsername, getAllUser } from "../controller/UserController.js";
import multer from "multer"


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


router.get("/:id", getUser);
router.get("/", getAllUser);
router.get("/username/:username", getUserByUsername);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.put("/:id/follow", followUser);
router.put("/:id/unfollow", unFollowUser);


export default router;