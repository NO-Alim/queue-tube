"use client";

import { updatePlaylistAction } from "@/actions/playlistActions/playlistActions";
import { throttle } from "lodash";
import { useCallback } from "react";
import ReactPlayer from "react-player";
import { toast } from "sonner";

const Player = ({ playlistId, videoId }) => {
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

  const handleUpdateHistory = async (playlistId, timestamp) => {
    try {
      const data = await updatePlaylistAction(playlistId, {
        watch_history: new Date(timestamp * 1000).toISOString().substr(11, 8), // Convert seconds to HH:mm:ss
        history_video_id: videoId,
      });

      if (data?.error) {
        toast.error(data.error || "Something went wrong.");
      } else {
        //toast.success("Playlist history updated successfully.");
      }
    } catch (error) {
      toast.error(error?.message || "Error updating history.");
    }
  };

  const handleVideoCompletion = async (playlistId, videoId) => {
    try {
      const data = await updatePlaylistAction(playlistId, {
        video_completed: [videoId], // Add the videoId to the video_completed array
      });

      if (data?.error) {
        toast.error(data.error || "Something went wrong.");
      } else {
        //toast.success(videoId);
      }
    } catch (error) {
      toast.error(error?.message || "Error updating completed videos.");
    }
  };

  const throttledUpdateHistory = useCallback(
    throttle((playlistId, timestamp) => {
      handleUpdateHistory(playlistId, timestamp);
    }, 10000),
    []
  );
  return (
    <div className="player-wrapper relative" style={{ paddingTop: "56.25%" }}>
      <ReactPlayer
        url={youtubeUrl}
        controls={true}
        width="100%"
        height="100%"
        className="absolute top-0 left-0"
        onProgress={({ playedSeconds }) =>
          throttledUpdateHistory(playlistId, Math.floor(playedSeconds))
        }
        onEnded={() => handleVideoCompletion(playlistId, videoId)}
      />
    </div>
  );
};

export default Player;
