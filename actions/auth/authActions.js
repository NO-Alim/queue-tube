"use server";

import { signIn } from "@/auth";
import { User } from "@/model/user_model";
import { AuthError } from "next-auth";

export const loginUser = async (formData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return res;
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          throw new Error("Invalid credentials");
        default:
          throw new Error("Internal Server Error");
      }
    } else {
      throw new Error(error?.message || "Internal Server Error");
    }
  }
};

export const singUpUser = async (formData) => {
  const firstName = formData.get("first-name");
  const lastName = formData.get("last-name");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  // password validation
  if (password !== confirmPassword) {
    throw new Error("Password and Confirm Password not Match.");
  }

  try {
    // if email already used
    const userExist = await User.findOne({ email });
    if (userExist) {
      throw new Error(`User Already Exist with This Email`);
    }

    const response = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    });
    const resObj = await response.json();
    if (response?.status === 201) {
      return resObj;
    } else {
      throw new Error(resObj?.error || "Internal Server Error");
    }
  } catch (error) {
    throw new Error(error?.message || "Internal Server Error");
  }
};
