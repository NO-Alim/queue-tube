"use client";
import { getVideos } from "@/actions/videos/videoAction";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { fetchWithRetry } from "@/utils/retry";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "sonner";
import Loading from "../@videos/loading";
import VideoItem from "./VideoItem";

const VideoItems = ({ playlistId, videoId, videosCompleted = [] }) => {
  const [videos, setVideos] = useState([]);
  const [pageToken, setPageToken] = useState("");
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchInitialVideos = async () => {
      try {
        const response = await fetchWithRetry(() =>
          getVideos({ playlistId, pageToken: "" })
        );
        setVideos(response?.items || []);
        setPageToken(response?.nextPageToken || "");
        setHasMore(!!response?.nextPageToken);
      } catch (error) {
        toast.error("Failed to load videos.");
      }
    };

    fetchInitialVideos();
  }, [playlistId]);

  const fetchMoreVideos = async () => {
    try {
      const response = await fetchWithRetry(() =>
        getVideos({ playlistId, pageToken })
      );
      setVideos((prevVideos) => [...prevVideos, ...(response?.items || [])]);
      setPageToken(response?.nextPageToken || "");
      setHasMore(!!response?.nextPageToken);
    } catch (error) {
      toast.error("Failed to load more videos.");
      setHasMore(false);
    }
  };

  return (
    <>
      <Accordion type="single" collapsible className=" lg:hidden">
        <AccordionItem value="videosItems">
          <AccordionTrigger className="font-bold">video list</AccordionTrigger>
          <AccordionContent className="">
            <InfiniteScroll
              dataLength={videos.length}
              next={fetchMoreVideos}
              hasMore={hasMore}
              loader={<Loading />}
              height={
                typeof window !== "undefined" ? window.innerHeight - 129 : 500
              }
              className="space-y-5 h-full pr-1 overflow-y-auto
      [&::-webkit-scrollbar]:w-2
      [&::-webkit-scrollbar-track]:rounded-full
      [&::-webkit-scrollbar-track]:bg-transparent
      [&::-webkit-scrollbar-thumb]:rounded-full
      [&::-webkit-scrollbar-thumb]:bg-gray-300
      dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
            >
              {videos.map((video) => {
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
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <InfiniteScroll
        dataLength={videos.length}
        next={fetchMoreVideos}
        hasMore={hasMore}
        loader={<Loading />}
        height={typeof window !== "undefined" ? window.innerHeight - 129 : 500}
        className=" hidden lg:block space-y-5 h-full pr-1 overflow-y-auto
      [&::-webkit-scrollbar]:w-2
      [&::-webkit-scrollbar-track]:rounded-full
      [&::-webkit-scrollbar-track]:bg-transparent
      [&::-webkit-scrollbar-thumb]:rounded-full
      [&::-webkit-scrollbar-thumb]:bg-gray-300
      dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
      >
        {videos.map((video) => {
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
    </>
  );
};

export default VideoItems;
