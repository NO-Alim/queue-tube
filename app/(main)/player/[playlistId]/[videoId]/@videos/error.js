"use client";
const SidebarVideosError = ({ error }) => {
  return (
    <div className="mt-6 lg:mt-0 w-full lg:w-1/4 space-y-4 border border-red-500 rounded p-4">
      <p className=" bg-red-600/40 text-lg capitalize p-2 rounded ">
        {error.message}
      </p>
    </div>
  );
};

export default SidebarVideosError;
