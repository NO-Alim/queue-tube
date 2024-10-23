"use client";
import { singUpUser } from "@/actions/auth/authActions";
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

export function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const response = await singUpUser(formData);

      // now login
      // const loginResponse = await loginUser(formData);
      // if (!!loginResponse.error) {
      //   toast.error(error?.message || "something went wrong.");
      //   router.push("/login");
      // } else {
      //   toast.success(`Welcome ${response.firstName} ${response.lastName}.`);
      //   router.push("/");
      // }
      router.push("/");
    } catch (error) {
      toast.error(error.message);
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
