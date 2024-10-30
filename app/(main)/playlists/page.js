import { Suspense } from "react";
import PlaylistContainerSkeleton from "./_components/PlaylistContainerSkeleton";
import PlaylistsContainer from "./_components/PlaylistsContainer";

const CoursesPage = async ({ searchParams }) => {
  return (
    <div className="container py-10 space-y-5">
      <Suspense fallback={<PlaylistContainerSkeleton />}>
        <PlaylistsContainer searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default CoursesPage;
