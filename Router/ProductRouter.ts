import express from "express"
import { CreateProduct } from "../Controller/ProductController"
import { verifyUser } from "../utils/VerifyToken"
const router = express.Router()


router.route("/Create-Product/:catID").post(verifyUser,CreateProduct
)

export default router