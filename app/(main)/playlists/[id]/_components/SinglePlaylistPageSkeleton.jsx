const SingleCourseSkeleton = () => {
  return (
    <div className="container mx-auto p-4 space-y-6 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Section: Playlist Thumbnail & Info */}
        <div className="md:col-span-1 space-y-4">
          <div className="relative w-full aspect-video bg-gray-300 rounded-md" />

          <div className="space-y-2">
            <div className="h-6 bg-gray-300 rounded w-3/4" />
            <div className="h-4 bg-gray-300 rounded w-5/6" />
          </div>
        </div>

        {/* Right Section: Video Thumbnails Grid */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="group space-y-2 hover:shadow-sm transition overflow-hidden border rounded-lg p-3"
            >
              <div className="relative w-full aspect-video bg-gray-300 rounded-md" />
              <div className="h-4 bg-gray-300 rounded w-3/4 mt-2" />
              <div className="h-3 bg-gray-300 rounded w-5/6" />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center space-x-2 mt-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="px-2 py-1 w-8 h-8 bg-gray-300 rounded" />
        ))}
      </div>
    </div>
  );
};

export default SingleCourseSkeleton;
