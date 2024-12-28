import { getPlaylistDetails } from "@/actions/playlistActions/playlistActions";
import { Suspense } from "react";
import PlaylistsContentContainer from "./_components/PlaylistsContentContainer";
import SingleCourseSkeleton from "./_components/SinglePlaylistPageSkeleton";

export async function generateMetadata({ params: { id } }) {
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
        images: thumbnails?.high?.url ? [thumbnails.high.url] : [],
        title: title || "Queue Tube - Playlist",
        description:
          description ||
          "Organize and watch your videos seamlessly with Queue Tube.",
      },
    };
  } catch (error) {
    // Fallback metadata
    return {
      title: "Queue Tube - Playlist",
      description: "Explore this playlist and manage your videos effortlessly.",
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
