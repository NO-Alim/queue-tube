import { getPlaylistsAction } from "@/actions/playlistActions/playlistActions";
import { CustomError } from "@/components/Error";
import { fetchWithRetry } from "@/utils/retry";
import PlaylistContainer from "../../components/PlaylistContainer";
import UnauthorizedHome from "../../components/unauthorizedHome";
import CustomPagination from "./CustomPaginaiton";

const ContentContainer = async ({ searchParams = {} }) => {
  const { playlists, totalCount } = await fetchWithRetry(() =>
    getPlaylistsAction(searchParams)
  );

  if (playlists?.error) {
    return <CustomError message={playlists.error} />;
  }

  if (!playlists || playlists?.length === 0) {
    return <UnauthorizedHome authorizedHome={true} />;
  }

  return (
    <>
      <PlaylistContainer playlists={playlists} />
      <CustomPagination
        redirectBaseUrl={"/playlists"}
        totalCount={totalCount}
      />
    </>
  );
};

export default ContentContainer;
