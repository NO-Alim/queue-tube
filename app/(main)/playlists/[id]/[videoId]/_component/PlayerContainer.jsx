import { getVideos } from "@/actions/videos/videoAction";
import Player from "./Player";
import VideoItems from "./VideoItems";

const PlayerContainer = async ({ playlistId, videoId, videosCompleted }) => {
  const videos = await getVideos({ playlistId, pageToken: "" });
  let videoItems = videos?.items || [];
  let nextPageToken = videos?.nextPageToken || "";
  let prevPageToken = videos?.prevPageToken || "";

  // current video index
  const currentIndex = videoItems.findIndex(
    (video) => video.snippet?.resourceId?.videoId === videoId
  );

  // Handle the case where the current video is the last one
  if (currentIndex === videoItems.length - 1 && nextPageToken) {
    const moreVideos = await getVideos({
      playlistId,
      pageToken: nextPageToken,
    });
    videoItems = videoItems.concat(moreVideos?.items || []);
    nextPageToken = moreVideos?.nextPageToken || null;
  }

  // Handle the case where the current video is the first one
  if (currentIndex === 0 && prevPageToken) {
    const moreVideos = await getVideos({
      playlistId,
      pageToken: prevPageToken,
    });
    videoItems = (moreVideos?.items || []).concat(videoItems);
    prevPageToken = moreVideos?.prevPageToken || null;
  }

  // next videoId
  const nextVideoId =
    currentIndex < videoItems.length - 1
      ? videoItems[currentIndex + 1]?.snippet?.resourceId?.videoId
      : null;
  // prev videoId
  const prevVideoId =
    currentIndex > 0
      ? videoItems[currentIndex - 1]?.snippet?.resourceId?.videoId
      : null;

  return (
    <div className="p-4">
      <div className="flex flex-col lg:flex-row justify-between lg:space-x-6">
        <div className="w-full lg:w-3/4">
          <Player
            playlistId={playlistId}
            videoId={videoId}
            nextVideoId={nextVideoId}
            prevVideoId={prevVideoId}
          />
        </div>

        <div className="mt-6 lg:mt-0 w-full lg:w-1/4 space-y-4">
          <VideoItems
            initialVideos={videoItems}
            playlistId={playlistId}
            videoId={videoId}
            nextPageToken={nextPageToken}
            videosCompleted={videosCompleted}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerContainer;
