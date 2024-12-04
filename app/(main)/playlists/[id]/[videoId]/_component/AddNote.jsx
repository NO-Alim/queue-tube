"use client";
import { addNoteAction } from "@/actions/note/noteActions";
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
import { ClipboardPlus } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

const AddNote = ({ playlistId, videoId, timestamp, onOpen }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleDialog = useCallback(() => {
    setDialogOpen((prev) => !prev);
    if (!dialogOpen && onOpen) onOpen(); // Capture timestamp when opening modal
  }, [dialogOpen, onOpen]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const note = formData.get("text");
    if (!note) {
      toast.error("Please enter valid note text.");
      return;
    }

    try {
      setLoading(true);
      formData.append("videoId", videoId);
      formData.append("timestamp", timestamp);

      const result = await addNoteAction(formData);
      if (result.success) {
        toast.success("Note added successfully.");
        toggleDialog();
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error(error?.message || "Something wrong.");
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
              <Button
                variant="secondary"
                className="flex justify-between gap-3"
              >
                <span className="font-bold">Add Note</span>
                <ClipboardPlus />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>
              Shortcut Key <span className="p-1 border rounded">Ctrl</span> +{" "}
              <span className="p-1 border rounded">Space</span>
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Add Note</DialogTitle>
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
