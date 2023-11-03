import express from "express"
import { verifyUser } from "../utils/VerifyToken"
import { CreateCategory } from "../Controller/CategoryController"

const router = express.Router()
router.route("/create-Category/:userID").post(verifyUser, CreateCategory);
export default router