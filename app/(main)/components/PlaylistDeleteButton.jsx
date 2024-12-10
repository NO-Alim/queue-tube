"use client";
import { deletePlaylistAction } from "@/actions/playlistActions/playlistActions";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const PlaylistDeleteButton = ({ playlistId }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async (playlistId) => {
    setLoading(true);
    try {
      const response = await deletePlaylistAction(playlistId);

      if (response?.error) {
        throw new Error(response.error);
      }
      toast.success("Playlist deleted successfully.");
    } catch (error) {
      toast.error(
        error?.message || "An error occurred while deleting the playlist."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      variant="destructive"
      size="sm"
      disabled={loading}
      className=" flex items-center font-semibold"
      onClick={() => handleDelete(playlistId)}
    >
      <Trash2 className=" mr-2 h-4 w-4" />
      <span>Delete</span>
    </Button>
  );
};

export default PlaylistDeleteButton;
