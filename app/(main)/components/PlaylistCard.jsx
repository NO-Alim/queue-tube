import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { truncateDescription } from "@/utils/truncate";
import { PlayCircle, VideoIcon, ViewIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PlaylistDeleteButton from "./PlaylistDeleteButton";

const PlaylistCard = ({ playlistDetails, playlistData }) => {
  if (!playlistDetails) {
    return null;
  }

  const { id, title, description, thumbnails, itemCount } =
    playlistDetails || {};
  const mediumThumbnail = thumbnails?.medium || {};

  const currentPlaylist =
    Array.isArray(playlistData) && playlistData.length > 0
      ? playlistData[0]
      : null;

  return (
    <div className="group space-y-2 hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
      <Link href={`/playlists/${id}`}>
        <div>
          <div className="relative w-full aspect-video rounded-md overflow-hidden">
            <Image
              src={mediumThumbnail.url}
              alt={title || "Playlist Thumbnail"}
              className="object-cover"
              fill
            />
          </div>
          <div className="flex flex-col pt-2 space-y-2">
            <div className="text-lg md:text-base font-medium group-hover:text-red-500 line-clamp-2">
              {title || "Untitled Playlist"}
            </div>
            <p className="text-xs text-muted-foreground">
              {truncateDescription(
                description || "No description available",
                20
              )}
            </p>
            <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
              <div className="flex items-center gap-x-1 text-slate-500">
                <VideoIcon className="w-4" />
                <span>{itemCount || 0} Videos</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-between">
        {currentPlaylist?.history_video_id ? (
          <Link
            href={`/player/${id}/${currentPlaylist.history_video_id}`}
            className={cn(
              buttonVariants({ size: "sm", variant: "destructive" }),
              "flex items-center font-semibold"
            )}
          >
            <PlayCircle className="mr-2 h-4 w-4" />
            <span>Play Now</span>
          </Link>
        ) : (
          <Link
            href={`/playlists/${id}`}
            className={cn(
              buttonVariants({ size: "sm", variant: "destructive" }),
              "flex items-center font-semibold"
            )}
          >
            <ViewIcon className="mr-2 h-4 w-4" />
            <span>View Playlist</span>
          </Link>
        )}
        <PlaylistDeleteButton playlistId={id} />
      </div>
    </div>
  );
};

export default PlaylistCard;
