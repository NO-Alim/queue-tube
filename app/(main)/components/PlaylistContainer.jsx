import PlaylistCardSkeleton from "@/components/PlaylistCardSkeleton";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import PlaylistCard from "./PlaylistCard";

const PlaylistContainer = async ({ playlists, browseAll = false }) => {
  return (
    <div className=" space-y-5">
      {browseAll && (
        <div className="flex justify-between items-center">
          <h1 className=" text-2xl">Your Lists</h1>
          <Link
            href={"/playlists"}
            className=" text-sm font-medium  hover:text-red-600 flex items-center gap-1"
          >
            Browse All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {playlists.map((item) => (
          <Suspense fallback={<PlaylistCardSkeleton />} key={item._id}>
            <PlaylistCard playlistId={item.playlist_id} />
          </Suspense>
        ))}
      </div>
    </div>
  );
};

export default PlaylistContainer;
