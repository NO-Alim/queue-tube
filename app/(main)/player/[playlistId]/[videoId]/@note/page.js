import NoteContainer from "../_component/NoteContainer";

const NotePageTab = ({ params: { playlistId, videoId } }) => {
  return (
    <div>
      <NoteContainer playlistId={playlistId} videoId={videoId} />
    </div>
  );
};

export default NotePageTab;
