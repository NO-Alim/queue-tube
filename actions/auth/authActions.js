"use server";

import { signIn } from "@/auth";
import { User } from "@/model/user_model";
import { dbConnect } from "@/service/mongo";
import { AuthError } from "next-auth";

export const loginUser = async (formData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    await dbConnect();
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

  // Field validation
  if (!firstName || firstName.trim() === "") {
    return { error: "First name is required." };
  }

  if (!lastName || lastName.trim() === "") {
    return { error: "Last name is required." };
  }

  if (!email || email.trim() === "") {
    return { error: "Email is required." };
  }

  if (!password || password.trim() === "") {
    return { error: "Password is required." };
  }

  if (!confirmPassword || confirmPassword.trim() === "") {
    return { error: "Confirm Password is required." };
  }

  // Password validation
  if (password !== confirmPassword) {
    return { error: "Password and Confirm Password do not match." };
  }

  try {
    // check the user already has Using this email
    await dbConnect();
    //if email already used
    const userExist = await User.findOne({ email });
    if (userExist) {
      throw new Error(`User Already Exist with This Email`);
    }
    // Register user via API
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_DEV}/api/register`,
      {
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
      }
    );

    const resObj = await response.json();
    if (response.status === 201) {
      return { success: true, user: resObj }; // Return success and user data
    } else {
      return { error: resObj?.error || "Internal Server Error" }; // Return error message
    }
  } catch (error) {
    return { error: error.message || "Internal Server Error" }; // Return error message
  }
};
