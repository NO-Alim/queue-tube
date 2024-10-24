"use server";

import { auth } from "@/auth";
import { addPlaylist, checkPlaylistExist } from "@/queries/playlist";
import { getUserByEmail } from "@/queries/user";
import filterIdFromLink from "@/utils/filterIdFromLink";

export async function getPlaylistDetails(playlistIdOrLink) {
  try {
    const playlistId = filterIdFromLink(playlistIdOrLink);

    // for check playlist exist or not
    const session = await auth();
    const loggedInUser = await getUserByEmail(session?.user?.email);
    const playlistAlreadyExist = await checkPlaylistExist(
      playlistId,
      loggedInUser._id
    );

    const response = await fetch(
      `${process.env.YOUTUBE_API}/playlists?part=snippet,contentDetails&id=${playlistId}&key=${process.env.YOUTUBE_API_KEY}`,
      {
        next: { revalidate: 86400 },
      }
    );
    const resObj = await response.json();

    // Check if the items array is empty
    if (!resObj.items || resObj.items.length === 0) {
      throw new Error("Playlist ID or URL isn't valid.");
    }

    // Extract necessary details
    const { id, snippet, contentDetails } = resObj.items[0];
    const playlistDetails = {
      id,
      title: snippet.title,
      description: snippet.description,
      publishedAt: snippet.publishedAt,
      thumbnails: snippet.thumbnails,
      channelId: snippet.channelId,
      channelTitle: snippet.channelTitle,
      itemCount: contentDetails.itemCount,
      playlistExistInDB: playlistAlreadyExist,
    };

    return playlistDetails;
  } catch (error) {
    throw new Error(error?.message || "Something went wrong.");
  }
}

export const addPlaylistAction = async (playlistId) => {
  try {
    // for checking playlist id is valid
    await getPlaylistDetails(playlistId);
    //
    const session = await auth();
    const loggedInUser = await getUserByEmail(session.user.email);
    const playlistAlreadyExist = await checkPlaylistExist(
      playlistId,
      loggedInUser._id
    );
    if (playlistAlreadyExist) {
      throw new Error("Playlist Already Exist");
    }

    const addedPlaylist = await addPlaylist(playlistId, loggedInUser._id);
    return;
  } catch (error) {
    throw new Error(error);
  }
};
