import { getNotesAction } from "@/actions/note/noteActions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchWithRetry } from "@/utils/retry";
import SingleNote from "./SingleNote";

const NoteContainer = async ({ playlistId, videoId }) => {
  const notesResponse = await fetchWithRetry(() => getNotesAction(videoId));

  const error = !notesResponse.success;
  const notes = notesResponse.success && notesResponse.data.notes;

  return (
    <Tabs defaultValue="note" className=" flex flex-col gap-3">
      <TabsList className="grid grid-cols-2 max-w-80">
        <TabsTrigger value="note">Notes</TabsTrigger>
        <TabsTrigger value="description">Description</TabsTrigger>
      </TabsList>
      <TabsContent value="note" className=" flex flex-col gap-3 max-w-[800px]">
        {error && (
          <p className="text-red-500">
            An error occurred while fetching notes.
          </p>
        )}
        {!error && notes?.length === 0 && (
          <p className="text-gray-500">No notes available for this video.</p>
        )}
        {!error &&
          notes?.length > 0 &&
          notes.map((note, index) => (
            <SingleNote note={note} key={note.noteId} />
          ))}
      </TabsContent>
      <TabsContent value="description">
        Tab content for Description.
      </TabsContent>
    </Tabs>
  );
};

export default NoteContainer;
