"use server";

import { auth } from "@/auth";
import { getLoggedInUser } from "@/lib/loggedInUser";
import { checkPlaylistExist } from "@/queries/playlist";
import filterIdFromLink from "@/utils/filterIdFromLink";
import { revalidateTag } from "next/cache";

// form youtube api
export const getPlaylistDetails = async (playlistIdOrLink) => {
  try {
    const playlistId = filterIdFromLink(playlistIdOrLink);
    // for check playlist exist or not
    const session = await auth();
    const loggedInUser = await getLoggedInUser();
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
};

export const addPlaylistAction = async (playlistId) => {
  try {
    const loggedInUser = await getLoggedInUser();
    if (!loggedInUser._id) {
      throw new Error("You are not authenticated.");
    }
    //check playlist id valid or not
    // if in valid error will throw getPlaylistDetails function
    await getPlaylistDetails(playlistId);
    //fetch
    const userId = loggedInUser._id;
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_PRODUCTION}/api/playlist/local`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ playlistId, userId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add playlist.");
    }

    revalidateTag("user-playlists");
    return;
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export const getPlaylistsAction = async ({
  title,
  limit = 5,
  page = 1,
  sort,
} = {}) => {
  try {
    const loggedInUser = await getLoggedInUser();
    if (!loggedInUser._id) {
      throw new Error("You are not authenticated.");
    }
    // Build the query parameters

    const params = new URLSearchParams();
    params.append("userId", loggedInUser?._id);
    if (title) params.append("title", title);
    params.append("limit", limit);
    params.append("page", page);
    if (sort) params.append("sort", sort);
    const url = `${
      process.env.NEXT_PUBLIC_BASE_URL_PRODUCTION
    }/api/playlist/local?${params.toString()}`;
    const response = await fetch(url, {
      next: { tags: ["user-playlists"] },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch playlists.");
    }

    return await response.json();
  } catch (error) {
    return {
      error: error.message,
    };
  }
};
