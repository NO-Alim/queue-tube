import SidebarVideoContainer from "../../_components/SidebarVideoContainer";

const VideosTabPage = ({ params: { playlistId, videoId } }) => {
  return (
    <div className="mt-6 lg:mt-0 w-full lg:w-1/4 space-y-4">
      <SidebarVideoContainer videoId={videoId} playlistId={playlistId} />
    </div>
  );
};

export default VideosTabPage;
