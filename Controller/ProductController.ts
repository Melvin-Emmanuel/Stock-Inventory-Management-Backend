import express,{Request,Response} from "express"
import CategoryModel from "../Model/CategoryModel"
import UserModel from "../Model/UserModel"
import ProductModel from "../Model/ProductModel"
import cloudinary from "../utils/cloudinary"
import mongoose from "mongoose"
// import path from "path"

export const CreateProduct = async(req:any, res: Response): Promise<Response> => {
    try {
        const { catID } = req.params
        const { Name, Image, Desc, Quantity, Price, Category } = req.body
        // if (!Name||!Desc || !Quantity || !Price) {
        //     return res.status(401).json({
        //         message:"fields cannot be empty"
        //     })
        // }
        const getCat: any = await CategoryModel.findOne({_id:catID})
        console.log(getCat)
        if (!getCat) {
            return res.status(404).json({
                message:"This Category does not exist. you must crate category first"
            })
        }
        const userId = await  getCat?.User._id
        console.log(userId)
        const checkUser=await UserModel.findOne({_id:userId})
        if (!checkUser) {
            return res.status(404).json({
                message:"user does not exist to create Product. signup to create"
            })
        }
     
        console.log("hvjhvjh",req.file.path);
        const ImageURl = await cloudinary.uploader.upload(req.file.path)
       
        const createProduct = await ProductModel.create({
          Name,
        //   Image:ImageURl.secure_url,
          Desc,
          Quantity,
          Price,
          Category:getCat.Name,
        });
        getCat.Products.push(new mongoose.Types.ObjectId(createProduct._id))
        await createProduct.save()
        await getCat.save()
        return res.status(201).json({
            message: "Product created successfully",
            result:CreateProduct
        })
    } catch (error:any) {
        return res.status(401).json({
            message:error.message
        })
    }
}
// const editProduct = async (req: Request, res: Response): Promise<Response> => {
    
// }