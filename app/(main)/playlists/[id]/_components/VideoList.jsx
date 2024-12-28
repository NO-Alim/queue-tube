import { getPlaylistData } from "@/actions/playlistActions/playlistActions";
import { fetchWithRetry } from "@/utils/retry";
import VideoCard from "./VideoCard";

const VideoList = async ({
  videos,
  playlistId,
  nextPageToken,
  videoCompleted,
}) => {
  // all playlist data from local DB
  const playlistData = await fetchWithRetry(() => getPlaylistData(playlistId));

  // find current playlistData from the playlistData
  const currentPlaylist =
    Array.isArray(playlistData) && playlistData.length > 0
      ? playlistData.find((playlist) => playlist.playlist_id === playlistId)
      : null;

  return (
    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
      {videos.map((video, index) => (
        <div key={video.id}>
          <VideoCard
            key={video.id}
            video={video}
            playlistId={playlistId}
            currentPlaylist={currentPlaylist}
          />
        </div>
      ))}
    </div>
  );
};

export default VideoList;
