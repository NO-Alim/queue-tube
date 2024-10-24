"use client";

import { addPlaylistAction } from "@/actions/playlistActions/playlistActions";
import { Button, buttonVariants } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ArrowLeft, VideoIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

const AddPlaylistCard = ({ playlistDetails, resetPlaylistData }) => {
  const {
    id,
    title,
    description,
    publishedAt,
    thumbnails,
    channelId,
    channelTitle,
    itemCount,
    playlistExistInDB,
  } = playlistDetails || {};

  const handleClick = async () => {
    try {
      await addPlaylistAction(id);
    } catch (error) {
      toast.error(error?.message || "Something went wrong in server side.");
    }
  };

  return (
    <>
      <DialogHeader>
        <div className=" absolute top-4 left-5">
          <ArrowLeft
            className=" h-4 w-4 text-sm text-primary/50 cursor-pointer hover:text-primary transition-all"
            onClick={resetPlaylistData}
          />
        </div>
        <DialogTitle className="text-center">Add Playlist</DialogTitle>
      </DialogHeader>
      <div className=" space-y-3">
        <div className=" flex items-center justify-center">
          <Image
            src={thumbnails.medium.url}
            alt={title}
            className="object-cover"
            width={thumbnails.medium.width}
            height={thumbnails.medium.height}
          />
        </div>
        <h1 className=" font-semibold">{title}</h1>
        <p className=" text-primary/50">{channelTitle}</p>
        <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
          <div className="flex items-center gap-x-1 text-slate-500">
            <div>
              <VideoIcon className="w-4" />
            </div>
            <span>{itemCount} Videos</span>
          </div>
        </div>
      </div>
      {playlistExistInDB ? (
        <Link
          href="#"
          className={cn(
            buttonVariants({ size: "sm", variant: "destructive" }),
            "px-4 font-bold"
          )}
        >
          Play Now
        </Link>
      ) : (
        <Button className="w-full" variant="destructive" onClick={handleClick}>
          Add Playlist
        </Button>
      )}
    </>
  );
};

export default AddPlaylistCard;
