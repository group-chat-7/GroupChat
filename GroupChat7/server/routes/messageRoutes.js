import express from "express"
import { getMessages, sendMessage } from "../controllers/messageController.js"
import protecRoute from "../middleware/protecRoute.js"

const router = express.Router()

router.get("/:id", protecRoute, getMessages)
router.post("/send/:id", protecRoute, sendMessage)
// router.post("/groups/create", protecRoute, createdGroupChat)
// router.post("/groups/rename", protecRoute, renameGroup)
// router.delete("/groups/:id", protecRoute, removeFromGroup)
// router.post("/groups:id", protecRoute, addToGroup)..

export default router