import express from "express";
import protecRoute from "../middleware/protecRoute.js";
import { getUsersForSidebar } from "../controllers/userController.js";

const router = express.Router()

router.get("/", protecRoute, getUsersForSidebar)

export default router   