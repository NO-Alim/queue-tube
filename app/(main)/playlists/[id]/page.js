import { Suspense } from "react";
import PlaylistsContentContainer from "./_components/PlaylistsContentContainer";
import SingleCourseSkeleton from "./_components/SinglePlaylistPageSkeleton";

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
