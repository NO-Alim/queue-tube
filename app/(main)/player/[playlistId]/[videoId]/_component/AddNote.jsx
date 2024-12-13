"use client";

import { addNoteAction, editNoteAction } from "@/actions/note/noteActions";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ClipboardPlus, Pencil } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

const AddNote = ({
  playlistId,
  videoId,
  timestamp,
  onOpen,
  edit = false,
  currentText = "",
  id = null,
  noteId = null,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [noteText, setNoteText] = useState("");

  const toggleDialog = useCallback(() => {
    setDialogOpen((prev) => {
      const isOpening = !prev;
      if (isOpening) {
        setNoteText(currentText || ""); // Initialize text when opening
        if (onOpen) onOpen(); // Trigger the optional onOpen callback
      }
      return isOpening;
    });
  }, [currentText, onOpen]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!noteText.trim()) {
      toast.error("Please enter valid note text.");
      return;
    }

    if (edit && noteText.trim() === currentText.trim()) {
      toast.warning("You have not made any changes to the note.");
      return;
    }

    try {
      setLoading(true);

      let result;
      if (edit) {
        result = await editNoteAction(id, noteId, videoId, noteText);
      } else {
        const formData = new FormData();
        formData.append("videoId", videoId);
        formData.append("timestamp", timestamp);
        formData.append("text", noteText);

        result = await addNoteAction(formData);
      }

      if (result.success) {
        toast.success(
          edit ? "Note updated successfully." : "Note added successfully."
        );
        toggleDialog();
      } else {
        throw new Error(result.message || "An error occurred.");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={toggleDialog}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              {edit ? (
                <Button variant="outline" size="sm">
                  <Pencil className=" w-4 h-4" />
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  className="flex justify-between gap-3"
                >
                  <span className="font-bold">Add Note</span>
                  <ClipboardPlus />
                </Button>
              )}
            </DialogTrigger>
          </TooltipTrigger>
          {!edit && (
            <TooltipContent side="bottom">
              <p>
                Shortcut Key <span className="p-1 border rounded">Ctrl</span> +{" "}
                <span className="p-1 border rounded">Space</span>
              </p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            {edit ? "Edit Note" : "Add Note"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="text" className="text-right font-semibold">
                Note Text
              </Label>
              <Textarea
                name="text"
                id="text"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Type Your Note Text."
              />
              <div className="flex justify-end">
                <Button type="submit" variant="destructive" disabled={loading}>
                  {loading ? <LoadingSpinner /> : "Save"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNote;
