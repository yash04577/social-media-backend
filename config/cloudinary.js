import cloudinaryConfig from "cloudinary";
const cloudinary = cloudinaryConfig.v2;

export const connectCloudinary = function(){
    cloudinary.config({
        cloud_name: 'dfz2lamqh',
        api_key: '646439624174993',
        api_secret: '_CUmLJypGdWYvP51M7nsmYUWKjk'
    })
}

console.log("cloudinary connected")