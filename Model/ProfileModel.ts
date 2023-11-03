import mongoose from "mongoose";

interface Profile {
  FirstName: string;
  LastName: string;
  DateOfBirth: string;
  Gender: string;
  Avatar: string;
}
interface IProfile extends Profile, mongoose.Document {}

const ProfileSchema = new mongoose.Schema(
  {
    FirstName: {
      type: String,
    },
    LastName: {
      type: String,
    },
    DateOfBirth: {
      type: String,
    },
    Gender: {
      type: String,
    },
    Avatar: {
      type: String,
    },

  },
  { timestamps: true }
);

export default mongoose.model<IProfile>("profile", ProfileSchema);
