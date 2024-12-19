import { Suspense } from "react";
import ContentContainer from "./_components/ContentContainer";
import PlaylistContainerSkeleton from "./_components/PlaylistContainerSkeleton";

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
