import {
  getPlaylistDetails,
  verifyPlaylist,
} from "@/actions/playlistActions/playlistActions";
import { getVideos } from "@/actions/videos/videoAction";
import { CustomError } from "@/components/Error";
import { fetchWithRetry } from "@/utils/retry";
import ButtonContainer from "./ButtonContainer";
import PlaylistThumbnailInfo from "./PlaylistThumbnailInfo";
import VideoList from "./VideoList";

const PlaylistsContentContainer = async ({
  id,
  searchParams,
  videoCompleted,
}) => {
  const { pageToken = "" } = searchParams || {};

  const isValidPlaylist = await verifyPlaylist(playlistId);

  if (isValidPlaylist.error) {
    return <CustomError message={isValidPlaylist.error} />;
  }

  if (!isValidPlaylist) {
    return <CustomError message="Playlist Id or Video Id isn't valid." />;
  }

  const playlistDetails = await fetchWithRetry(() => getPlaylistDetails(id));
  if (playlistDetails?.error) {
    return <CustomError message={playlistDetails.error} />;
  }

  const videos = await fetchWithRetry(() =>
    getVideos({ playlistId: id, pageToken: pageToken })
  );
  const nextPageToken = videos?.nextPageToken || "";
  const prevPageToken = videos?.prevPageToken || "";
  return (
    <div className=" space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PlaylistThumbnailInfo playlistDetails={playlistDetails} />
        <VideoList
          videos={videos?.items}
          playlistId={id}
          nextPageToken={nextPageToken}
        />
      </div>
      <ButtonContainer
        nextPageToken={nextPageToken}
        prevPageToken={prevPageToken}
      />
    </div>
  );
};

export default PlaylistsContentContainer;
