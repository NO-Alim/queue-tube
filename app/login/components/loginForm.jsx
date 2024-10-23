"use client";
import { loginUser } from "@/actions/auth/authActions";
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

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  //
  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const response = await loginUser(formData);

      if (!!response.error) {
        toast.error(error?.message || "something went wrong.");
      } else {
        router.push("/");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false); // Set isLoading to false after the API call completes
    }
  }
  return (
    <Card className="w-[350px] pb-5">
      <CardHeader>
        <CardTitle className="text-center">Login</CardTitle>
        <CardDescription className="text-center">
          Enter Your email to Login Account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <div className=" flex flex-col items-center w-full gap-4">
            <div className=" w-full space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="jhon@example.com"
                type="email"
                name="email"
                required
              />
            </div>
            <div className="w-full space-y-1">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="***********"
                  type="password"
                  name="password"
                  required
                />
              </div>
            </div>
            <Button
              variant="destructive"
              type="submit"
              className="w-full font-bold"
              disabled={loading}
            >
              {loading ? <LoadingSpinner /> : "Login"}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 justify-between">
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="underline text-red-600">
            Register Now
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
