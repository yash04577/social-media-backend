import userModel from "../models/userSchema.js";
import bcrypt from "bcrypt";

export const getUser = async(req, res)=>{
    const id = req.params.id;
    try{
        const user = await userModel.findById(id);
        if(user){
        
            const {password, ...otherDetails} = user._doc;
            res.status(200).json(otherDetails)
        }
        else{
            res.status(404).json("no user found")
        }
    }
    catch(err){
        res.status(500).json({message: err});
    }
}

export const getAllUser = async(req, res) =>{
    try{
        const users = await userModel.find({});
        if(users){
        
            // const {password, ...otherDetails} = user._doc;
            // res.status(200).json(otherDetails)
            res.status(200).json(users)
        }
        else{
            res.status(404).json("no user found")
        }
    }
    catch(err){
        res.status(500).json({message: err});
    }
}

export const getUserByUsername = async(req, res)=>{
    const username = req.params.username;
    console.log("username ", username)
    try{
        const user = await userModel.findOne({username:username});
        if(user){
        
            const {password, ...otherDetails} = user._doc;
            console.log("username detail ", user)
            res.status(200).json(otherDetails)
        }
        else{
            console.log("username detail not found")
            res.status(404).json("no user found")
        }
    }
    catch(err){
        res.status(500).json({message: err});
    }
}

export const updateUser = async(req, res) =>{
    const id = req.params.id;
    const {currentUserId, currentUserAdminStatus, password} = req.body;

    if(id === currentUserId || currentUserAdminStatus){
        try{

            if(password){
                req.body.password = await bcrypt.hash(password, 10);
            }
            const user = await userModel.findByIdAndUpdate(id, req.body, {new: true});
            res.status(200).json(user);
        }
        catch(err){
            res.status(500).json(err);
        }
    }
    else{
        res.status(500).json("access denied");
    }
}


export const deleteUser = async(req, res) =>{
    const id = req.params.id;
    const {currentUserId, currentUserAdminStatus} = req.body;

    if(id === currentUserId || currentUserAdminStatus){

        try{
            await userModel.findByIdAndDelete(id);
            res.status(200).json("user deleted");
        }
        catch(err){
            res.status(500).json(err);
        }
    }
    else{
        res.status(500).json("access denied");
    }
}


export const followUser = async(req, res) =>{
    const id = req.params.id;
    const {currentUserId, currentUserAdminStatus} = req.body;

    if(currentUserId === id){
        res.status(403).json("frobidden action");
    }
    else{
        try {
            const followUser = await userModel.findById(id);
            const followingUser = await userModel.findById(currentUserId);

            if(!followUser.followers.includes(currentUserId)){
                await followUser.updateOne({$push : {followers : currentUserId}});
                await followingUser.updateOne({$push : {following : id}});
                res.status(200).json("user followed");
            }
            else{
                res.status(403).json("user is already followed by you");
            }
        }catch (error) {
            res.status(500).json(error);
        }
    }
}



export const unFollowUser = async(req, res) =>{
    const id = req.params.id;
    const {currentUserId, currentUserAdminStatus} = req.body;

    if(currentUserId === id){
        res.status(403).json("frobidden action");
    }
    else{
        try {
            const followUser = await userModel.findById(id);
            const followingUser = await userModel.findById(currentUserId);

            if(followUser.followers.includes(currentUserId)){
                await followUser.updateOne({$pull : {followers : currentUserId}});
                await followingUser.updateOne({$pull : {following : id}});
                res.status(200).json("user unfollowed");
            }
            else{
                res.status(403).json("user is not followed by you followed");
            }
        }catch (error) {
            res.status(500).json(error);
        }
    }
}