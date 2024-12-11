"use client";
import { deleteNoteAction } from "@/actions/note/noteActions";
import { Button } from "@/components/ui/button";
import { formatTimestamp } from "@/utils/timeConverter";
import { Clock4, Pencil, Tally1, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const SingleNote = ({ id, note, videoId }) => {
  const [loading, setLoading] = useState(false);
  const { _id, text, timestamp } = note || {};

  const handleDelete = async (id, noteId, videoId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmDelete) {
      return; // Exit if the user cancels
    }

    setLoading(true);
    try {
      const response = await deleteNoteAction(id, noteId, videoId);

      if (!response.success) {
        throw new Error(response?.message || "Failed to delete the note.");
      }

      toast.success("Note deleted successfully.");
    } catch (error) {
      toast.error(
        error?.message || "An error occurred while deleting the note."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex p-5 border rounded gap-5 items-center">
      <div className=" flex gap-3 items-center ">
        <Clock4 />
        <p>{timestamp ? formatTimestamp(timestamp) : "00:00:00"}</p>
      </div>
      <div>
        <Tally1 />
      </div>
      <div className=" flex-1 flex items-center justify-between">
        <div>
          <p>{text || "No content available for this note."}</p>
        </div>
        <div className=" flex space-x-2">
          <Button disabled={loading} size="sm" variant="outline">
            <Pencil className=" w-4 h-4" />
          </Button>
          <Button
            onClick={() => handleDelete(id, _id, videoId)}
            disabled={loading}
            size="sm"
            variant="outline"
          >
            <Trash2 className=" w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SingleNote;
