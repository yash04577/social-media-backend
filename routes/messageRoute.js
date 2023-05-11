import express from "express"
import { adMessage, getMessages } from "../controller/messageController.js";


const router = express.Router();

router.post("/", adMessage);
router.get("/:chatId", getMessages)


export default router