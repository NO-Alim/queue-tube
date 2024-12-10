"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useVideoContext } from "@/provider/VideoContext";
import { useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import SidebarVideoLoading from "../[videoId]/@videos/loading";
import SidebarSingleVideo from "./SidebarSingleVideo";

const SidebarVideoContainer = ({ videoId, playlistId }) => {
  const { videos, hasMore, fetchMoreVideos, videosCompleted } =
    useVideoContext();
  const scrollContainerRef = useRef(null);

  // Prevent default scroll reset on render
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.scrollBehavior = "auto"; // Disable smooth scrolling temporarily
      const currentVideoElement = scrollContainerRef.current.querySelector(
        `[data-video-id="${videoId}"]`
      );

      if (currentVideoElement) {
        currentVideoElement.scrollIntoView({
          block: "center",
        });
      }
      scrollContainerRef.current.style.scrollBehavior = "smooth"; // Re-enable smooth scrolling
    }
  }, [videoId]);

  return (
    <>
      <Accordion type="single" collapsible className="lg:hidden">
        <AccordionItem value="videosItems">
          <AccordionTrigger className="font-bold">Video List</AccordionTrigger>
          <AccordionContent>
            <div ref={scrollContainerRef} className=" scrollbar-hide">
              <InfiniteScroll
                dataLength={videos.length}
                next={fetchMoreVideos}
                hasMore={hasMore}
                loader={<SidebarVideoLoading />}
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
                    <SidebarSingleVideo
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
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div ref={scrollContainerRef} className="hidden lg:block scrollbar-hide">
        <InfiniteScroll
          dataLength={videos.length}
          next={fetchMoreVideos}
          hasMore={hasMore}
          loader={<SidebarVideoLoading />}
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
              <SidebarSingleVideo
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
      </div>
    </>
  );
};

export default SidebarVideoContainer;
