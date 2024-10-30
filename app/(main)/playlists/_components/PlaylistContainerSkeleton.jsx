import PlaylistCardSkeleton from "@/components/PlaylistCardSkeleton";

const PlaylistContainerSkeleton = () => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
      <PlaylistCardSkeleton />
      <PlaylistCardSkeleton />
      <PlaylistCardSkeleton />
      <PlaylistCardSkeleton />
    </div>
  );
};

export default PlaylistContainerSkeleton;
