import chatModel from "../models/chatSchema.js";

export const createChat = async(req, res) =>{

    console.log("req come")

    const newChat = new chatModel({
        members: [req.body.senderId, req.body.receverId]
    });

    try {
        const result = await newChat.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error)
    }
}


export const userChats = async(req, res) =>{
    try {
        const chat = await chatModel.find({
            members: {$in: [req.params.userId]}
        })
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json(error)
    }
}


export const findChat = async(req, res) =>{
    try {
        const chat = await chatModel.findOne({
            members: {$all: [req.params.firstId, req.params.secondId]}
        })
        if(chat){
            res.status(200).json(chat);
        }
        else{
            res.status(200).json("no chat found");
        }
    } catch (error) {
        res.status(500).json(error)
    }
}