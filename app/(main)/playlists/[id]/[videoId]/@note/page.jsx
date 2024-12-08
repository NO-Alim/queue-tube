import NoteContainer from "../_component/NoteContainer";

const NoteTab = ({ params: { id: playlistId, videoId } }) => {
  return (
    <div>
      <NoteContainer playlistId={playlistId} videoId={videoId} />
    </div>
  );
};

export default NoteTab;
