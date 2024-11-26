import { getPlaylistDetails } from "@/actions/playlistActions/playlistActions";
import { getVideos } from "@/actions/videos/videoAction";
import ButtonContainer from "./ButtonContainer";
import PlaylistThumbnailInfo from "./PlaylistThumbnailInfo";
import VideoList from "./VideoList";

const PlaylistsContentContainer = async ({ id, searchParams }) => {
  const { pageToken = "" } = searchParams || {};
  const playlistDetails = await getPlaylistDetails(id);
  const videos = await getVideos({ playlistId: id, pageToken: pageToken });
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
