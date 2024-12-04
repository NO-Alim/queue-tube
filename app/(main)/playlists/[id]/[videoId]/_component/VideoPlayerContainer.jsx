import {
  getPlaylistData,
  getPlaylistsAction,
} from "@/actions/playlistActions/playlistActions";
import { CustomError } from "@/components/Error";
import PlayerContainer from "./playerContainer";

const VideoPlayerContainer = async ({ playlistId, videoId }) => {
  const { playlists, totalCount } = await getPlaylistsAction();
  const playlistData = await getPlaylistData(playlistId);
  const exists = playlists.some((item) => item.playlist_id === playlistId);

  if (!exists) {
    return (
      <CustomError message="You are not authorized to watch this playlist" />
    );
  }

  const currentPlaylist = playlistData.find(
    (playlist) => playlist.playlist_id === playlistId
  );

  const videosCompleted = Array.isArray(currentPlaylist.video_completed)
    ? currentPlaylist.video_completed
    : [];

  return (
    <div>
      <PlayerContainer
        playlistId={playlistId}
        videoId={videoId}
        videosCompleted={videosCompleted}
      />
    </div>
  );
};

export default VideoPlayerContainer;
