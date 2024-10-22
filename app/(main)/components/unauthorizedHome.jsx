import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { AddPlaylistModal } from "./AddPlaylistModal";
import FAQs from "./FAQs";
import VideoPlayer from "./videoPlayer";

const UnauthorizedHome = ({ authorizedHome = false }) => {
  return (
    <div className="container flex flex-col gap-16 py-5">
      <div className=" w-full grid md:grid-cols-2 gap-5">
        <div className=" space-y-5 h-full flex flex-col justify-center">
          <h1 className=" text-6xl">Save, Watch, Learn, and Excel!</h1>
          <p className=" text-primary/50 text-lg">
            Queue Tube lets you efficiently manage and track your favorite video
            playlists. Add up to 20 playlists, watch without distractions, and
            take notes with timestamps for smarter learning. Organize your top 5
            playlists as favorites, and share playlists or videos with ease—all
            within a streamlined interface.
          </p>
          <div>
            {authorizedHome ? (
              <AddPlaylistModal />
            ) : (
              <Link
                href="/register"
                className={cn(
                  buttonVariants({ size: "lg", variant: "destructive" }),
                  "px-4 font-bold"
                )}
              >
                Start Now
              </Link>
            )}
          </div>
        </div>
        <div className=" h-[400px]"></div>
      </div>
      <div className=" w-full border border-gray-600/50 rounded-md p-4 bg-primary/5 grid md:grid-cols-2 gap-5 ">
        <FAQs />
        <div>
          <VideoPlayer url="https://www.youtube.com/watch?v=fFPP5ees6Kw" />
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedHome;
