const VideoPlayerSkeleton = () => {
  return (
    <div className="container mx-auto p-4 space-y-6 animate-pulse">
      <div className="flex justify-between space-x-6">
        <div className="w-3/4 bg-gray-300 rounded-md aspect-video" />

        <div className="w-1/4 space-y-4">
          <div className="h-10 bg-gray-300 rounded" />
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 bg-gray-300 p-6 rounded"
            >
              <div className="w-6 h-6 bg-gray-400 rounded-full" />
              <div className="h-4 bg-gray-400 rounded w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerSkeleton;
