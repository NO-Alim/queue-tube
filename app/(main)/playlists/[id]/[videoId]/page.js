import { Suspense } from "react";
import VideoPlayerSkeleton from "./_component/VideoPlayerSkeleton";
import VideoPlayerContainer from "./_component/videoPlayerContainer";

const VideoPlayer = ({ params: { id: playlistId, videoId } }) => {
  return (
    <div className=" container py-10 space-y-5">
      <Suspense fallback={<VideoPlayerSkeleton />}>
        <VideoPlayerContainer playlistId={playlistId} videoId={videoId} />
      </Suspense>
    </div>
  );
};

export default VideoPlayer;
