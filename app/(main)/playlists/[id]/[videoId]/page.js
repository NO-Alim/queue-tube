import { Suspense } from "react";
import NoteContainer from "./_component/NoteContainer";
import VideoPlayerContainer from "./_component/VideoPlayerContainer";
import VideoPlayerSkeleton from "./_component/VideoPlayerSkeleton";

const VideoPlayer = ({ params: { id: playlistId, videoId } }) => {
  return (
    <div className=" container py-10 space-y-5">
      <Suspense fallback={<VideoPlayerSkeleton />}>
        <VideoPlayerContainer playlistId={playlistId} videoId={videoId} />
      </Suspense>
      <Suspense fallback={<h1>Loading..........</h1>}>
        <NoteContainer playlistId={playlistId} videoId={videoId} />
      </Suspense>
    </div>
  );
};

export default VideoPlayer;
