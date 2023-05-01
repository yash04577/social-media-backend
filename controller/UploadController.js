import multer from "multer"
import express from "express"

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
    try {
        if(file){
            res.status(200).json(file.filename);
        }
        else{
            res.status(500).json("please send file")
        }
        
    } catch (error) {
        res.status(500).json({test:"checking", err:error})
    }
})

export default router
