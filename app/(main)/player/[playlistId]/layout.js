import {
  getPlaylistData,
  getPlaylistDetails,
  getPlaylistsAction,
} from "@/actions/playlistActions/playlistActions";
import { VideoProvider } from "@/provider/VideoContext";
import { fetchWithRetry } from "@/utils/retry";

export async function generateMetadata({ params: { playlistId } }) {
  try {
    // Fetch playlist details
    const playlistDetails = await fetchWithRetry(() =>
      getPlaylistDetails(playlistId)
    );
    const { title, description, thumbnails } = playlistDetails || {};

    // Return metadata
    return {
      title: title ? `Queue Tube - Player: ${title}` : "Queue Tube - Player",
      description:
        description ||
        "Explore this Video and enjoy distraction-free watching and note-taking.",
      openGraph: {
        images: thumbnails?.high?.url ? [thumbnails.high.url] : [],
        title: title || "Queue Tube - Player",
        description:
          description ||
          "Organize and watch your videos seamlessly with Queue Tube.",
      },
    };
  } catch (error) {
    // Fallback metadata
    return {
      title: "Queue Tube - Player",
      description: "Explore this Video and manage effortlessly.",
    };
  }
}

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
