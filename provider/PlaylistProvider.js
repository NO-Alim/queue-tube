"use client";

const { createContext, useContext } = require("react");

const PlaylistContext = createContext();

export default function PlaylistProvider({
  initialVideos,
  videosCompleted,
  children,
}) {
  return (
    <PlaylistContext.Provider value={videos}>
      {children}
    </PlaylistContext.Provider>
  );
}

export const usePlaylistVideos = () => {
  const context = useContext(PlaylistContext);
  if (!context) {
    throw new Error(
      "usePlaylistVideos must be used within a PlaylistProvider."
    );
  }
  return context;
};
