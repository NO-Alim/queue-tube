import { auth } from "@/auth";
import Link from "next/link";
import { AddPlaylistModal } from "./components/AddPlaylistModal";
import PlaylistContainer from "./components/PlaylistContainer";
import SearchPlaylist from "./components/SearchPlaylist";
import UnauthorizedHome from "./components/unauthorizedHome";

const HomePage = async () => {
  const session = await auth();

  if (!session?.user) {
    return <UnauthorizedHome />;
  }

  return (
    <div className=" container">
      <div className="">
        <div className=" py-10 space-y-5">
          <div className="flex flex-col md:flex-row-reverse gap-5 md:items-center justify-between">
            <div className=" flex items-center gap-5">
              <Link href="#" className=" hover:text-red-600">
                Recent
              </Link>
              <Link href="#" className=" hover:text-red-600">
                Favourite
              </Link>
              <AddPlaylistModal />
            </div>
            <div>
              <SearchPlaylist />
            </div>
          </div>
        </div>
        <PlaylistContainer />
      </div>
    </div>
  );
};

export default HomePage;
