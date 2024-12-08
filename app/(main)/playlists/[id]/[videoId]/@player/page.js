import Player from "../_component/Player";

const PlayerTab = ({ params: { id: playlistId, videoId } }) => {
  return (
    <div className="w-full lg:w-3/4">
      <Player videoId={videoId} playlistId={playlistId} />
    </div>
  );
};

export default PlayerTab;
