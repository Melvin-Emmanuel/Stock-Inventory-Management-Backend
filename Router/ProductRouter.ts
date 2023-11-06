import express from "express"
import { CreateProduct } from "../Controller/ProductController"
import { verifyUser } from "../utils/VerifyToken"
import { upload } from "../utils/Multer"
const router = express.Router()


router.route("/Create-Product/:catID").post(verifyUser,upload, CreateProduct
)

export default router