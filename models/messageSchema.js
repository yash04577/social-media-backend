import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
   chatId: String,
   text: String,
   senderId: String
},{timestamps: true});

const messageModel = mongoose.model("message", messageSchema);
export default messageModel;