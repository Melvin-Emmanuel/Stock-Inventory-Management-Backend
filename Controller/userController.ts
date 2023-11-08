import userModel from "../Model/UserModel";
import ProfileModel from "../Model/ProfileModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken"
import ProductModel from "../Model/ProductModel";


export const createUser = async (req: Request, res: Response) => {
  try {
    const { FullName, Email, Password } = req.body;
    if (!Email || !Password || !FullName) {
      return res.status(401).json({
        Message: "All fields required",
      });
    }

    const checkemail = await userModel.findOne({ Email: Email });

    if (checkemail) {
      return res.status(401).json({
        message: "email already in use",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(Password, salt);

    const UserData = await userModel.create({
      FullName,
      Email,
      Password: hashedpassword,
    });
    const createProfile = await ProfileModel.create({
      _id: UserData._id,
      FirstName: "",
      LastName: "",
      Gender: "",
      Avatar: "",
      DateOfBirth: "",
    });

    UserData.Profile = createProfile._id;
    await UserData.save();
    return res.status(201).json({
      message: "registration successful",
      success: 1,
      result: UserData,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "unable to create user",
      reason: error.message,
    });
  }
};



export const UserLogin = async (req: Request, res: Response): Promise<Response>=>{
  try {
    const { Email, Password } = req.body;
    if (!Email || !Password) {
      return res.status(401).json({ message: "please fill all fields" });
    }
    const checkEmail: any = await userModel.findOne({ Email: Email });
    console.log(checkEmail);
    if (checkEmail) {
      const checkPassword = await bcrypt.compare(Password, checkEmail.Password);
      if (checkPassword) {
        const token: any = Jwt.sign(
          {
            _id: checkEmail._id,
            FullName: checkEmail.FullName,
            Role: checkEmail.Role,
          },
          "melvinmelasiemmanuelUserVerification",
          { expiresIn: "4d" }
        );
        console.log(token);
        res.cookie("sessionId", token);
        console.log(req.headers["cookie"]);
        return res.status(200).json({
          success: 1,
          message: "login successful",
        });
      } else {
        return res.status(404).json({ message: "incorrect password" });
      }
    } else {
      return res.status(404).json({ message: "user not found" });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}
// export const getSingleUser = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   try {
//     const { userID } = req.params;
//     const checkuser = await userModel.findOne({ _id: req.params.id });
//     if (!checkuser) {
//       res.status(401).json({
//         message: "user does not exist",
//       });
//     }
//     const getOneUser = await userModel.findById(req.params.id).populate({
//       path: "Profile",
//       select: "FirstName LastName  DateOfBirth",
//     });

//     return res.status(200).json({
//       message: "user gotten successfully",
//       data: getOneUser,
//     });
//   } catch (error: any) {
//     return res.status(401).json({
//       message: " error occured in getting user",
//       reason: error.message,
//     });
//   }
// };


export const checkOutProduct = async (req: Request, res: Response): Promise<Response> => {

  try {
    
    const { ProductID } = req.params
    const getProducct = await ProductModel.findById(ProductID)
    if (!getProducct) {
      return res.status(404).json({
        message:"product does not exist"
      })
    }


  } catch (error:any) {
    return res.status(401).json({
      message:error.Message
    })
    
  }
  
}

