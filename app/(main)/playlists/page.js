import { Suspense } from "react";
import ContentContainer from "./_components/ContentContainer";
import PlaylistContainerSkeleton from "./_components/PlaylistContainerSkeleton";

export const metadata = {
  title: "Queue Tube - Manage Your Playlists",
  description:
    "View and manage all your playlists in one place. Organize your favorites, track videos, and take timestamped notes effortlessly.",
  url: "https://queue-tube.vercel.app",
  type: "website",
  images: [
    {
      url: "https://queue-tube.vercel.app/assets/thumbnail.jpg",
      width: 1200,
      height: 630,
      alt: "Queue Tube Thumbnail",
    },
  ],
};
const CoursesPage = async ({ searchParams }) => {
  return (
    <div className="container py-10 space-y-5">
      <Suspense fallback={<PlaylistContainerSkeleton />}>
        <ContentContainer searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default CoursesPage;
