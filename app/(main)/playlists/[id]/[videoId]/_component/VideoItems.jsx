"use client";
import { getVideos } from "@/actions/videos/videoAction";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "sonner";
import VideoItem from "./VideoItem";

const VideoItems = ({
  initialVideos = [],
  nextPageToken = "",
  playlistId,
  videosCompleted = [],
  videoId,
}) => {
  const [videos, setVideos] = useState(
    Array.isArray(initialVideos) ? initialVideos : []
  );
  const [pageToken, setPageToken] = useState(nextPageToken);

  const [hasMore, setHasMore] = useState(!!nextPageToken);

  const fetchMoreVideos = async () => {
    try {
      const response = await getVideos({ playlistId, pageToken });
      const videoItems = response?.items || [];
      const nextPage = response?.nextPageToken || "";

      setVideos((prevVideos) => [...prevVideos, ...videoItems]);
      setPageToken(nextPage);
      setHasMore(!!nextPage);
    } catch (error) {
      setHasMore(false);
      toast.error(error?.message || "Something went wrong.");
    }
  };
  return (
    <InfiniteScroll
      dataLength={videos.length}
      next={fetchMoreVideos}
      hasMore={hasMore}
      loader={<LoadingSpinner />}
      height={typeof window !== "undefined" ? window.innerHeight - 129 : 500}
      className="space-y-5 h-full pr-1 overflow-y-auto
      [&::-webkit-scrollbar]:w-2
      [&::-webkit-scrollbar-track]:rounded-full
      [&::-webkit-scrollbar-track]:bg-transparent
      [&::-webkit-scrollbar-thumb]:rounded-full
      [&::-webkit-scrollbar-thumb]:bg-gray-300
      dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
    >
      {videos.map((video, index) => {
        const {
          snippet: {
            title,
            resourceId: { videoId: snippetVideoId },
          },
        } = video;

        const isCompleted = videosCompleted.includes(snippetVideoId);
        return (
          <VideoItem
            key={snippetVideoId}
            videoId={snippetVideoId}
            currentPlaying={videoId}
            playlistId={playlistId}
            isCompleted={isCompleted}
            title={title}
          />
        );
      })}
    </InfiniteScroll>
  );
};

export default VideoItems;
