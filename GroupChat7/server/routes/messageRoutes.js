import express from "express"
import { getMessages, sendMessage } from "../controllers/messageController.js"
import protecRoute from "../middleware/protecRoute.js"

const router = express.Router()

router.get("/:id", protecRoute, getMessages)
router.post("/send/:id", protecRoute, sendMessage)

export default router