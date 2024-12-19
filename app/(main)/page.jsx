import { getPlaylistsAction } from "@/actions/playlistActions/playlistActions";
import { auth } from "@/auth";
import { CustomError } from "@/components/Error";
import { fetchWithRetry } from "@/utils/retry";
import { AddPlaylistModal } from "./components/AddPlaylistModal";
import PlaylistContainer from "./components/PlaylistContainer";
import UnauthorizedHome from "./components/unauthorizedHome";

const HomePage = async () => {
  const session = await auth();
  if (!session?.user) {
    return <UnauthorizedHome />;
  }

  const { playlists, totalCount } = await fetchWithRetry(() =>
    getPlaylistsAction()
  );
  if (playlists?.error) {
    return <CustomError message={playlists.error} />;
  }

  if (!playlists || playlists?.length === 0) {
    return <UnauthorizedHome authorizedHome={true} />;
  }

  return (
    <div className=" container">
      <div className="">
        <div className=" py-10 space-y-5">
          <div className="flex flex-col md:flex-row-reverse gap-5 md:items-center justify-between">
            <div className=" flex items-center gap-5">
              <AddPlaylistModal />
            </div>
            <div>{/* <SearchInput redirectBaseUrl={"/playlists"} /> */}</div>
          </div>
        </div>
        <PlaylistContainer playlists={playlists} browseAll={true} />
      </div>
    </div>
  );
};

export default HomePage;
