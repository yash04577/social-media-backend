import express from "express"
import { authUser, loginUser, registerUser } from "../controller/AuthController.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:token", authUser);

export default router;