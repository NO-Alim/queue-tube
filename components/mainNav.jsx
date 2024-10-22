import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import Link from "next/link";
import Logo from "./logo";
import Logout from "./logout";
import { ModeToggle } from "./mode-toggle";
import { buttonVariants } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const MainNav = async () => {
  const session = await auth();

  return (
    <nav className=" container py-2 w-full flex justify-between items-center bg-primary/5">
      <Link href={"/"}>
        <Logo />
      </Link>
      <div className=" flex items-center justify-between space-x-3">
        <div className=" flex items-center justify-between space-x-3">
          {session?.user?.email ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className=" cursor-pointer">
                  <AvatarImage src="" />
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Logout />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link
                href="/login"
                className={cn(buttonVariants({ size: "sm" }), "px-4 font-bold")}
              >
                SingIn
              </Link>
              <Link
                href="/register"
                className={cn(
                  buttonVariants({ size: "sm", variant: "secondary" }),
                  "px-4 font-bold"
                )}
              >
                SingUp
              </Link>
            </>
          )}
        </div>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default MainNav;
