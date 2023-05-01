import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required : true
    },
    firstname: {
        type: String,
        required : true
    },
    lastname: {
        type: String,
        required : true
    },
    password: {
        type: String,
        required : true
    },
    isAdmin: {
        type: Boolean
        // required: true
    },
    profilePicture: String,
    coverPicture: String,
    about: String,
    livesin: String,
    worksAt: String,
    relationship: String,
    followers: [],
    following: []
}, {timestamps: true})

const userModel = mongoose.model("user", userSchema);
export default userModel;