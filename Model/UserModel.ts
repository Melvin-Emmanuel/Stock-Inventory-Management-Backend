import mongoose from "mongoose";

interface user {
  FullName: string;
  Email: string;
  Password: string;
  Profile: {};
}
  
interface Iuser extends user, mongoose.Document {}

const userSchema = new mongoose.Schema(
  {
    FullName: {
      type: String,
    },
    Email: {
      type: String,
    },
    Password: {
      type: String,
    },
    Profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "profile",
    },
  },
  { timestamps: true }
);

export default mongoose.model<Iuser>("user", userSchema);
