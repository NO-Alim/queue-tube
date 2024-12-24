"use client";

import { TriangleAlert } from "lucide-react";

const RootError = ({ error, reset }) => {
  return (
    <div className="container mt-6 lg:mt-0 w-full h-screen  space-y-4     flex flex-col items-center justify-center">
      <span>
        <TriangleAlert className=" w-20 h-20 text-red-500" />
      </span>
      <p className=" bg-red-600/40 md:text-lg capitalize p-2 rounded ">
        Something Went Wrong!
      </p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Try Again
      </button>
    </div>
  );
};

export default RootError;
