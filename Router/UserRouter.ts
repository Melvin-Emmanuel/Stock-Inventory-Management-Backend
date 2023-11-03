import express from "express"
import { UserLogin, createUser } from "../Controller/userController"
import { verifyUser } from "../utils/VerifyToken"
const router = express.Router()

router.route("/Create-User").post(createUser)
router.route("/Login-user").post( UserLogin)

export default router