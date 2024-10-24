import { User } from "@/model/user_model";

export const getUserByEmail = async (email) => {
  const user = await User.findOne({ email: email }).select("-password").lean();
  return user;
};
