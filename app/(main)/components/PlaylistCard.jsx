import {
  getPlaylistData,
  getPlaylistDetails,
} from "@/actions/playlistActions/playlistActions";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fetchWithRetry } from "@/utils/retry";
import { truncateDescription } from "@/utils/truncate";
import { PlayCircle, VideoIcon, ViewIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const PlaylistCard = async ({ playlistId }) => {
  const playlistDetails = await fetchWithRetry(() =>
    getPlaylistDetails(playlistId)
  );
  const playlistData = await fetchWithRetry(() => getPlaylistData(playlistId));

  if (!playlistDetails) return null;

  const currentPlaylist =
    Array.isArray(playlistData) && playlistData.length > 0
      ? playlistData.find((playlist) => playlist.playlist_id === playlistId)
      : null;

  const {
    id,
    title,
    description,
    publishedAt,
    thumbnails,
    channelId,
    channelTitle,
    itemCount,
  } = playlistDetails || {};
  const mediumThumbnail = thumbnails.medium;

  return (
    <div className="group space-y-2 hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
      <Link href={`/playlists/${id}`}>
        <div>
          <div className="relative w-full aspect-video rounded-md overflow-hidden">
            <Image
              src={mediumThumbnail.url}
              alt={title}
              className="object-cover"
              fill
            />
          </div>
          <div className="flex flex-col pt-2 space-y-2">
            <div className="text-lg md:text-base font-medium group-hover:text-red-500 line-clamp-2">
              {title}
            </div>
            <p className="text-xs text-muted-foreground">
              {truncateDescription(description, 20)}
            </p>
            <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
              <div className="flex items-center gap-x-1 text-slate-500">
                <div>
                  <VideoIcon className="w-4" />
                </div>
                <span>{itemCount} Videos</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-between">
        {currentPlaylist?.history_video_id ? (
          <Link
            href={`/playlists/${id}/${currentPlaylist.history_video_id}`}
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
      </div>
    </div>
  );
};

export default PlaylistCard;
