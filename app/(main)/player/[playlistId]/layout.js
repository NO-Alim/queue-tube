import {
  getPlaylistData,
  getPlaylistDetails,
  verifyPlaylist,
} from "@/actions/playlistActions/playlistActions";
import { CustomError } from "@/components/Error";
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
  // Ensure the playlist exists for the authenticated user
  const playlistExist = await verifyPlaylist(playlistId);

  if (!playlistExist) {
    return (
      <CustomError message="You are not authenticated to watch this playlist" />
    );
  }

  if (playlistExist?.error) {
    return <CustomError message={playlistExist.error} />;
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
