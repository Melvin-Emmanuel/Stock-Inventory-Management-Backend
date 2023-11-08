import express from "express"
import { verifyUser } from "../utils/VerifyToken"
import { CreateCategory } from "../Controller/CategoryController"

const router = express.Router()
router.route("/create-Category").post(verifyUser,CreateCategory);
router.route("/get-All-user").post(verifyUser, CreateCategory);
export default router