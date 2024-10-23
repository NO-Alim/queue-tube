"use client";
import { getPlaylist } from "@/actions/playlistActions/playlistActions";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import AddPlaylistCard from "./AddPlaylistCard";

export function AddPlaylistModal() {
  const [loading, setLoading] = useState(false);
  const [playlistData, setPlaylistData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const playlistId = formData.get("playlistId");

    // empty input
    if (!playlistId) {
      toast.error("Please enter a valid playlist ID.");
      setLoading(false);
      return;
    }
    try {
      const playlistDetails = await getPlaylist(playlistId);
      setPlaylistData(playlistDetails);
    } catch (error) {
      setPlaylistData(null);
      toast.error(error?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const resetPlaylistData = () => {
    setPlaylistData(null);
  };

  return (
    <Dialog onOpenChange={resetPlaylistData}>
      <DialogTrigger asChild>
        <Button variant="destructive" className=" font-semibold">
          Add Playlist
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {playlistData ? (
          <AddPlaylistCard
            playlistDetails={playlistData}
            resetPlaylistData={resetPlaylistData}
          />
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-center">Add Playlist</DialogTitle>
              <DialogDescription className="text-center">
                To Add Playlist, Put Your Playlist link or Id.
                PL_XxuZqN0xVD0op-QDEgyXFA4fRPChvkl
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className=" space-y-2">
                  <Label htmlFor="playlistId" className="text-right">
                    Playlist Id
                  </Label>
                  <Input
                    name="playlistId"
                    id="playlistId"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="destructive" disabled={loading} type="submit">
                  {loading ? <LoadingSpinner /> : "Search"}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
