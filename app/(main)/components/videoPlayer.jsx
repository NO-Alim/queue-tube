const VideoPlayer = ({ url }) => {
  return (
    <div className="relative aspect-video">
      <iframe
        className="w-full h-full"
        src="https://www.youtube.com/embed/-mEC57qp5fQ?si=C919BHJ2iCT3K7Ug"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
