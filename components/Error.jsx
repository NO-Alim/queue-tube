"use client";

import { TriangleAlert } from "lucide-react";

export function CustomError({ message = "Something Went wrong." }) {
  return (
    <div className="container mt-6 lg:mt-0 w-full h-[80vh]  space-y-4 flex flex-col items-center justify-center">
      <span>
        <TriangleAlert className=" w-20 h-20 text-red-500" />
      </span>
      <p className=" bg-red-600/40 md:text-lg capitalize p-2 rounded ">
        {message}
      </p>
    </div>
  );
}
