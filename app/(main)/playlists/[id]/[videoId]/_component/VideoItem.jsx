"use client";
import { CircleCheck } from "lucide-react";
import Link from "next/link";

const VideoItem = ({
  videoId,
  playlistId,
  title,
  isCompleted,
  currentPlaying,
}) => {
  return (
    <Link
      href={`/playlists/${playlistId}/${videoId}`}
      className={`flex items-center space-x-4 p-4 rounded cursor-pointer border ${
        videoId === currentPlaying && "border-green-500 "
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <CircleCheck
          className={` w-10 h-10  ${
            isCompleted ? "text-green-500" : "text-gray-400"
          }`}
        />
        <h4 className="text-sm font-medium text-primary line-clamp-2">
          {title}
        </h4>
      </div>
    </Link>
  );
};

export default VideoItem;
