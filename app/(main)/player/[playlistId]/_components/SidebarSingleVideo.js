"use client";
import { CircleCheck } from "lucide-react";
import Link from "next/link";

const SidebarSingleVideo = ({
  videoId,
  playlistId,
  title,
  isCompleted,
  currentPlaying,
}) => {
  return (
    <Link
      href={`/player/${playlistId}/${videoId}`}
      data-video-id={videoId}
      className={`flex items-center space-x-4 p-4 rounded cursor-pointer border ${
        videoId === currentPlaying && "border-green-500 "
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <CircleCheck
          className={`w-5 h-5 lg:w-10 lg:h-10 ${
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

export default SidebarSingleVideo;
