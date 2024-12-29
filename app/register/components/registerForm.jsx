"use client";
import { loginUser, singUpUser } from "@/actions/auth/authActions";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

// zod schema for password validation
const registerSchema = z
  .object({
    firstName: z.string().nonempty("First name is required"),
    lastName: z.string().nonempty("Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^a-zA-Z0-9]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        firstName: formData.get("first-name"),
        lastName: formData.get("last-name"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
      };

      // validate form data useing zod
      const validationResult = registerSchema.safeParse(data);
      if (!validationResult.success) {
        const errorMessages = validationResult.error.errors.map(
          (err) => err.message
        );
        const combinedErrorMessage = errorMessages.join(", "); // Combine messages into one string
        toast.error(combinedErrorMessage); // Display one toast with all error messages
        return;
      }

      const response = await singUpUser(formData);

      if (response.error) {
        toast.error(response.error);
      } else {
        await loginUser(formData);
        toast.success(
          `Welcome ${response.user.firstName} ${response.user.lastName}.`
        );
        router.push("/"); // Redirect to home or another page
      }
    } catch (error) {
      toast.error("Something went wrong!"); // Handle unexpected errors
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-[350px] pb-5">
      <CardHeader>
        <CardTitle className="text-center">Register</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  id="first-name"
                  name="first-name"
                  placeholder="john"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  id="last-name"
                  name="last-name"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="johndoe@example.com"
                required
              />
            </div>
            <div className=" grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="***********"
                  type="password"
                  name="password"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  placeholder="***********"
                  type="password"
                  name="confirmPassword"
                  required
                />
              </div>
            </div>
            <Button
              disabled={loading}
              variant="destructive"
              type="submit"
              className="w-full font-bold"
            >
              {loading ? <LoadingSpinner /> : "Register"}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-5 justify-between">
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline text-red-600">
            Login Now
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
