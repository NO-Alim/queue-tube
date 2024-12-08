import {
  getPlaylistData,
  getPlaylistsAction,
} from "@/actions/playlistActions/playlistActions";
import { fetchWithRetry } from "@/utils/retry";
import VideoItems from "../_component/VideoItems";

const VideoTab = async ({ params: { id: playlistId, videoId } }) => {
  const { playlists } = await fetchWithRetry(() => getPlaylistsAction());
  const playlistData = await fetchWithRetry(() => getPlaylistData(playlistId));

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
    <div className="mt-6 lg:mt-0 w-full lg:w-1/4 space-y-4">
      <VideoItems
        playlistId={playlistId}
        videoId={videoId}
        videosCompleted={videosCompleted}
      />
    </div>
  );
};

export default VideoTab;
