import { getPlaylistDetails } from "@/actions/playlistActions/playlistActions";
import { Suspense } from "react";
import PlaylistsContentContainer from "./_components/PlaylistsContentContainer";
import SingleCourseSkeleton from "./_components/SinglePlaylistPageSkeleton";

export async function generateMetadata({ params: { id }, searchParams }) {
  try {
    // Fetch playlist details
    const playlistDetails = await fetchWithRetry(() => getPlaylistDetails(id));
    const { title, description, thumbnails } = playlistDetails || {};

    // Return metadata
    return {
      title: title
        ? `Queue Tube - Playlist: ${title}`
        : "Queue Tube - Playlist",
      description:
        description ||
        "Explore this playlist and enjoy distraction-free watching and note-taking.",
      openGraph: {
        title: title || "Queue Tube - Playlist",
        description:
          description ||
          "Organize and watch your videos seamlessly with Queue Tube.",
        url: `https://queue-tube.vercel.app/playlist/${id}`, // Dynamic URL for the playlist
        type: "website", // Content type
        images: [
          {
            url: thumbnails?.high?.url
              ? thumbnails.high.url
              : "https://queue-tube.vercel.app/assets/thumbnail.jpg",
            width: 1200, // Recommended width for Open Graph
            height: 630, // Recommended height for Open Graph
            alt: title
              ? `Thumbnail for playlist: ${title}`
              : "Queue Tube Default Thumbnail",
          },
        ],
      },
    };
  } catch (error) {
    // Fallback metadata
    return {
      title: "Queue Tube - Playlist",
      description: "Explore this playlist and manage your videos effortlessly.",
      openGraph: {
        title: "Queue Tube - Playlist",
        description:
          "Explore this playlist and manage your videos effortlessly.",
        url: `https://queue-tube.vercel.app/playlist/${id}`, // Fallback URL
        type: "website",
        images: [
          {
            url: "https://queue-tube.vercel.app/assets/thumbnail.jpg",
            width: 1200,
            height: 630,
            alt: "Queue Tube Default Thumbnail",
          },
        ],
      },
    };
  }
}

const SingleCourse = async ({ params: { id }, searchParams }) => {
  return (
    <div className="  container py-10 space-y-5">
      <Suspense fallback={<SingleCourseSkeleton />}>
        <PlaylistsContentContainer id={id} searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default SingleCourse;
