import { getPlaylistData } from "@/actions/playlistActions/playlistActions";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CircleCheck, PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const VideoCard = async ({ video, playlistId, videoCompleted }) => {
  const {
    snippet: {
      title,
      thumbnails: { medium },
      description,
      publishedAt,
      channelTitle,
      resourceId: { videoId },
    },
    contentDetails: { videoPublishedAt },
  } = video;

  const playlistData = await getPlaylistData(playlistId);

  const currentPlaylist = playlistData.find(
    (playlist) => playlist.playlist_id === playlistId
  );

  const isCompleted =
    currentPlaylist?.video_completed.includes(videoId) || false;

  return (
    <div className="group space-y-2 hover:shadow-sm transition overflow-hidden border rounded-lg p-3">
      <Link
        href={`/playlists/${playlistId}/${videoId}`}
        className=" space-y-3 flex flex-col justify-between h-full"
      >
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image src={medium.url} alt={title} className="object-cover" fill />
          <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-1.5 py-0.5 rounded">
            {new Date(videoPublishedAt).toLocaleDateString()}
          </span>
        </div>
        <div className="text-sm font-medium group-hover:text-red-500 line-clamp-2">
          {title}
        </div>
        <div className=" flex items-center justify-between">
          <p className="text-xs text-gray-500 line-clamp-1">{channelTitle}</p>
          {isCompleted && <CircleCheck className=" text-green-500" />}
        </div>
        <Link
          href={`/playlists/${playlistId}/${videoId}`}
          className={cn(
            buttonVariants({ size: "sm", variant: "destructive" }),
            "flex items-center font-semibold"
          )}
        >
          <PlayCircle className="mr-2 h-4 w-4" />
          <span>Play Now</span>
        </Link>
      </Link>
    </div>
  );
};

export default VideoCard;
