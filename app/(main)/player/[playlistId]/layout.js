import {
  getPlaylistData,
  getPlaylistsAction,
} from "@/actions/playlistActions/playlistActions";
import { VideoProvider } from "@/provider/VideoContext";
import { fetchWithRetry } from "@/utils/retry";

const PlayerLandingPage = async ({ children, params: { playlistId } }) => {
  const playlistData = await fetchWithRetry(() => getPlaylistData(playlistId));
  const { playlists } = await fetchWithRetry(() => getPlaylistsAction());
  // Ensure the playlist exists for the authenticated user
  const exists = playlists.some((item) => item.playlist_id === playlistId);
  if (!exists) {
    throw new Error("You are not authorized to watch this video");
  }

  const currentPlaylist =
    Array.isArray(playlistData) && playlistData.length > 0
      ? playlistData.find((playlist) => playlist.playlist_id === playlistId)
      : null;

  const videosCompleted = Array.isArray(currentPlaylist?.video_completed)
    ? currentPlaylist.video_completed
    : [];

  return (
    <div>
      <VideoProvider playlistId={playlistId} videosCompleted={videosCompleted}>
        {children}
      </VideoProvider>
    </div>
  );
};

export default PlayerLandingPage;
