import VideoCard from "./VideoCard";

const VideoList = ({ videos, playlistId, nextPageToken, videoCompleted }) => {
  return (
    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
      {videos.map((video, index) => (
        <VideoCard key={video.id} video={video} playlistId={playlistId} />
      ))}
    </div>
  );
};

export default VideoList;
