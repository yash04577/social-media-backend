import multer from "multer"
import cloudinaryConfig from "cloudinary"
const cloudinary = cloudinaryConfig.v2;

let storage = multer.diskStorage({})
let upload = multer({ storage }).single("myFile")

export const uploadImage = async(file, quality, height) =>{
  try {

    const options = {folder:"test"};
    
    if(quality){
      options.quality = quality
    }
    
    if(height){
      options.height = height
    }
    
    // options.resourse_type = "auto";

    const response = await cloudinary.uploader.upload(file.path, options);
    console.log("res ", response)
    return response;

  } catch (error) {
    res.status(500).json({ test: "checking", err: error })
  }
}

