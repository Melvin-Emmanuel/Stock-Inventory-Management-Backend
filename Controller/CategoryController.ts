import { Request, Response } from "express"
import CategoryModel from "../Model/CategoryModel"
import UserModel from "../Model/UserModel"
import slugify from "slugify"

export const CreateCategory = async (req:any, res: Response):Promise<Response> => {
 try {
     const { Name, Slug } = req.body;
     const userID = req.user;
       function generateCategoryId() {
         const characters = "ABCDEFGHIJKLMNOPRSTUabcdefghijklmnop";
         const length = 6;
         let randomId = "";
         for (let i = 0; i < length; i++) {
           randomId += characters.charAt(
             Math.floor(Math.random() * characters.length)
           );
         }
         return randomId;
     }
       const checkCategory = await CategoryModel.findOne({ Name: Name });
       if (checkCategory) {
         return res.status(401).json({
           message: "this category already exists",
         });
       }
       if (!Name) {
         return res.status(401).json({
           message: "name cannot be empty",
         });
     }
     let x:number=4
   
     //   const { userID } = req.params;
     
     
     
       const checkUser = await  UserModel.findOne({ _id: userID });
       console.log(checkUser)
       if (!checkUser) {
         return res.status(401).json({
           message: "user does not exist",
         });
       }
       const CatData = await CategoryModel.create({
         Name,
         Slug: `${slugify(Name)}-${generateCategoryId()}`,
       });
   
    
    //    CatData.Products=[]
       CatData.User = userID
      CatData.save();
     
    
     return res.status(201).json({
         message: "Category Created successfully",
         result:CatData
    })
 } catch (error:any) {
     return res.status(401).json({
        message:error.message
    })
 }
}

export const updateCategory = async (req: Request, res: Response): Promise<Response>=> {
    try {
        const { catID } = req.params
        const {Name}=req.body
        const Update = await CategoryModel.findByIdAndUpdate(catID, {
           Name,
        }, {
            new:true
        })
        return res.status(200).json({
            message:"updated category successfully"
        })
    } catch (error:any) {
        return res.status(401).json({
            message:error.message
        })
    }
}
export const DeletCategory = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { catID } = req.body
        const data=CategoryModel.findByIdAndDelete(catID)
        return res.status(200).json({
            message:"Category has been deleted successfully",
          
        })
    } catch (error:any) {
        return res.status(401).json({
            message:error.message
        })
    }
    
}
export const GetAllCategory = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { UserID } = req.params
        const getUser=await UserModel.findOne({_id:UserID})
        const getCat = await CategoryModel.find({ user: getUser?._id });
        return res.status(401).json({
            message: "category gotten",
            result:getCat
        })
    } catch (error:any) {
        return res.status(401).json({
            message:error.message
        })
    }
}
export const getSingleCategory = async (req: Request, res: Response): Promise<Response> => {
    const { catID } = req.params
    
    const data=CategoryModel.findOne({_id:catID}).populate({
        path: "User",
        select:"FullName"
        
    })
    return res.status(200).json({
        message: "single Category gotten",
        result:data
    })
}