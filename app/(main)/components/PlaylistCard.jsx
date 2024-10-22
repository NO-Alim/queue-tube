import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlayCircle, VideoIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const PlaylistCard = ({ playlist }) => {
  return (
    <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
      <Link href="#">
        <div>
          <div className="relative w-full aspect-video rounded-md overflow-hidden">
            <Image
              src={`/assets/thumbnail.jpg`}
              alt="hello world"
              className="object-cover"
              fill
            />
          </div>
          <div className="flex flex-col pt-2">
            <div className="text-lg md:text-base font-medium group-hover:text-red-500 line-clamp-2">
              Hello world lorem
            </div>
            <p className="text-xs text-muted-foreground">
              Lorem ipsum dolor sit amet.
            </p>
            <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
              <div className="flex items-center gap-x-1 text-slate-500">
                <div>
                  <VideoIcon className="w-4" />
                </div>
                <span>5 Videos</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-between">
        <Link
          href="#"
          className={cn(
            buttonVariants({ size: "sm", variant: "destructive" }),
            "flex items-center font-semibold"
          )}
        >
          <PlayCircle className="mr-2 h-4 w-4" />
          <span>Play Now</span>
        </Link>
      </div>
    </div>
  );
};

export default PlaylistCard;
