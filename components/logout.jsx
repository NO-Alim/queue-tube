"use client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";

const Logout = () => {
  return (
    <Link
      href="#"
      className="flex items-center"
      onClick={() => {
        signOut();
      }}
    >
      <LogOut className="mr-2 h-4 w-4" />
      <span>Log out</span>
    </Link>
  );
};

export default Logout;
