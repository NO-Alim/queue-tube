import { User } from "@/model/user_model";
import { dbConnect } from "@/service/mongo";

export const getUserByEmail = async (email) => {
  await dbConnect();
  const user = await User.findOne({ email: email }).select("-password").lean();
  return user;
};
