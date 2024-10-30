import { getPlaylistsAction } from "@/actions/playlistActions/playlistActions";
import { CustomError } from "@/components/Error";
import PlaylistCardSkeleton from "@/components/PlaylistCardSkeleton";
import { Suspense } from "react";
import PlaylistCard from "../../components/PlaylistCard";
import UnauthorizedHome from "../../components/unauthorizedHome";
import CustomPagination from "./CustomPaginaiton";

const PlaylistsContainer = async ({ searchParams = {} }) => {
  const { playlists, totalCount } = await getPlaylistsAction(searchParams);

  if (playlists?.error) {
    return <CustomError message={playlists.error} />;
  }

  if (playlists?.length === 0) {
    return <UnauthorizedHome authorizedHome={true} />;
  }

  return (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {playlists.map((item) => (
          <Suspense fallback={<PlaylistCardSkeleton />} key={item._id}>
            <PlaylistCard playlistId={item.playlist_id} />
          </Suspense>
        ))}
      </div>
      <CustomPagination redirectBaseUrl={"/playlists"} totalCount />
    </>
  );
};

export default PlaylistsContainer;
