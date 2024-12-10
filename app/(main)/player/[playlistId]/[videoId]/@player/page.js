"use client";

import Player from "../_component/Player";

const PlayerPageTab = ({ params: { playlistId, videoId } }) => {
  return (
    <div className="w-full lg:w-3/4">
      <Player videoId={videoId} playlistId={playlistId} />
    </div>
  );
};

export default PlayerPageTab;
