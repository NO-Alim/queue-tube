import { verifyPlaylist } from "@/actions/playlistActions/playlistActions";
import { CustomError } from "@/components/Error";

const VideoPlayerPage = async ({ params: { playlistId, videoId } }) => {
  const isValidPlaylist = await verifyPlaylist(playlistId);

  if (isValidPlaylist.error) {
    return <CustomError message={isValidPlaylist.error} />;
  }

  if (!isValidPlaylist) {
    return <CustomError message="Playlist Id or Video Id isn't valid." />;
  }

  return null;
};

export default VideoPlayerPage;
