"use client";

import {
  getPlaylistData,
  updatePlaylistAction,
} from "@/actions/playlistActions/playlistActions";
import { fetchWithRetry } from "@/utils/retry";
import { convertToSeconds } from "@/utils/timeConverter";
import { throttle } from "lodash";
import { useCallback, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { toast } from "sonner";
import AddNote from "./AddNote";

const Player = ({ playlistId, videoId }) => {
  const [videoStartFrom, setVideoStartFrom] = useState(0);
  const [progressTimestamp, setProgressTimestamp] = useState(0); // Tracks dynamic progress
  const [capturedTimestamp, setCapturedTimestamp] = useState(null); // Tracks timestamp when modal is opened

  const handleGetDetails = async () => {
    try {
      const playlistData = await fetchWithRetry(() =>
        getPlaylistData(playlistId)
      );
      const currentPlaylist =
        Array.isArray(playlistData) && playlistData.length > 0
          ? playlistData.find((playlist) => playlist.playlist_id === playlistId)
          : null;

      if (videoId === currentPlaylist?.history_video_id) {
        const seconds = convertToSeconds(currentPlaylist.watch_history);
        setVideoStartFrom(seconds);
      }
    } catch (error) {}
  };

  useEffect(() => {
    handleGetDetails();
  }, [playlistId]);

  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

  const handleUpdateHistory = async (playlistId, timestamp) => {
    try {
      const data = await updatePlaylistAction(playlistId, {
        watch_history: new Date(timestamp * 1000).toISOString().substr(11, 8), // Convert seconds to HH:mm:ss
        history_video_id: videoId,
      });

      if (data?.error) {
        toast.error(data.error || "Something went wrong.");
      }
    } catch (error) {
      toast.error(error?.message || "Error updating history.");
    }
  };

  const handleVideoCompletion = async (playlistId, videoId) => {
    try {
      const data = await updatePlaylistAction(playlistId, {
        video_completed: [videoId],
      });

      if (data?.error) {
        toast.error(data.error || "Something went wrong.");
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

  const handleOpenNoteModal = () => {
    setCapturedTimestamp(progressTimestamp); // Capture timestamp when modal opens
  };

  return (
    <>
      <div className="player-wrapper relative" style={{ paddingTop: "56.25%" }}>
        <ReactPlayer
          key={videoStartFrom} // Forces reinitialization when start time changes
          url={youtubeUrl}
          controls={true}
          width="100%"
          height="100%"
          className="absolute top-0 left-0"
          onProgress={({ playedSeconds }) => {
            setProgressTimestamp(Math.floor(playedSeconds)); // Update dynamic progress
            throttledUpdateHistory(playlistId, Math.floor(playedSeconds));
          }}
          onEnded={() => {
            throttledUpdateHistory.flush();
            handleVideoCompletion(playlistId, videoId);
          }}
          config={{ youtube: { playerVars: { start: videoStartFrom } } }}
        />
      </div>
      <div className="mt-5 flex justify-end pr-5">
        <AddNote
          playlistId={playlistId}
          videoId={videoId}
          timestamp={capturedTimestamp}
          onOpen={handleOpenNoteModal}
        />
      </div>
    </>
  );
};

export default Player;
