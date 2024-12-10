"use client";

import { getVideos } from "@/actions/videos/videoAction";
import { fetchWithRetry } from "@/utils/retry";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const VideoContext = createContext();

export const VideoProvider = ({ playlistId, videosCompleted, children }) => {
  const [videos, setVideos] = useState([]);
  const [pageToken, setPageToken] = useState("");
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    // Fetch videos only when the playlistId changes
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

    if (playlistId) {
      fetchInitialVideos();
    }
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
    <VideoContext.Provider
      value={{ videos, videosCompleted, hasMore, fetchMoreVideos }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error("useVideoContext must be used within a VideoProvider");
  }
  return context;
};
