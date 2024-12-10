"use client";

import { TriangleAlert } from "lucide-react";

const SidebarVideosError = ({ error }) => {
  return (
    <div className="mt-6 lg:mt-0 w-full lg:w-3/4 space-y-4 border border-red-500 rounded p-4 flex flex-col items-center justify-center">
      <span>
        <TriangleAlert className=" w-20 h-20 text-red-500" />
      </span>
      <p className=" bg-red-600/40 md:text-lg capitalize p-2 rounded ">
        {error.message}
      </p>
    </div>
  );
};

export default SidebarVideosError;
