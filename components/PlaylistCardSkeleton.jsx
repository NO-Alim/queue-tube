const PlaylistCardSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-300 rounded-md w-full h-52"></div>
      <div className="flex flex-col pt-2">
        <div className="h-6 bg-gray-300 rounded-md w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded-md w-1/2"></div>
        <div className="flex items-center gap-x-2 text-sm mt-3">
          <div className="h-4 bg-gray-300 rounded-md w-20"></div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-3">
        <div className="h-10 bg-gray-300 rounded-md w-28"></div>
      </div>
    </div>
  );
};

export default PlaylistCardSkeleton;
