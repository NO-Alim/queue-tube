import { getPlaylistData } from "@/actions/playlistActions/playlistActions";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fetchWithRetry } from "@/utils/retry";
import { PlayCircle, ViewIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const PlayerLink = ({ playlistId }) => {
  const [playlistData, setPlaylistData] = useState(null);
  const handleDetails = async (playlistId) => {
    const playlistData = await fetchWithRetry(() =>
      getPlaylistData(playlistId)
    );

    const currentPlaylist =
      Array.isArray(playlistData) && playlistData.length > 0
        ? playlistData.find((playlist) => playlist.playlist_id === playlistId)
        : null;

    setPlaylistData(currentPlaylist);
  };

  useEffect(() => {
    handleDetails(playlistId);
  }, [playlistId]);

  return (
    <>
      {playlistData?.history_video_id ? (
        <Link
          href={`/player/${playlistId}/${playlistData.history_video_id}`}
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
          href={`/playlists/${playlistId}`}
          className={cn(
            buttonVariants({ size: "sm", variant: "destructive" }),
            "flex items-center font-semibold"
          )}
        >
          <ViewIcon className="mr-2 h-4 w-4" />
          <span>View Playlist</span>
        </Link>
      )}
    </>
  );
};

export default PlayerLink;
