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

    if (!loggedInUser._id) {
      throw new Error("You are not authenticated.");
    }

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
    return {
      error: error?.message || "Something went wrong.",
    };
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
    const playlistDetails = await getPlaylistDetails(playlistId);
    //fetch
    const userId = loggedInUser._id;
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_PRODUCTION}/api/playlist/local`;

    const dataToSave = {
      playlistId,
      userId,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSave),
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

// get user playlist
export const getPlaylistsAction = async (searchParams = {}) => {
  try {
    const loggedInUser = await getLoggedInUser();
    if (!loggedInUser._id) {
      throw new Error("You are not authenticated.");
    }

    // query parameters
    const params = new URLSearchParams();
    params.append("userId", loggedInUser._id);
    params.append(
      "limit",
      searchParams.limit || process.env.NEXT_PUBLIC_TOTAL_COUNT
    );
    params.append("page", searchParams.page || 1);
    if (searchParams.sort) params.append("sort", searchParams.sort);

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

// this details from local server, and it contain playlist history data and completed Playlist array.
export const getPlaylistData = async (playlistId) => {
  try {
    const loggedInUser = await getLoggedInUser();
    if (!loggedInUser._id) {
      throw new Error("You are not authenticated.");
    }

    // query parameters
    const params = new URLSearchParams();
    params.append("userId", loggedInUser._id);

    const url = `${
      process.env.NEXT_PUBLIC_BASE_URL_PRODUCTION
    }/api/playlist/local/${playlistId}?${params.toString()}`;
    const response = await fetch(url, {
      next: { tags: [`playlist-${playlistId}`] },
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

export const updatePlaylistAction = async (playlistId, data) => {
  try {
    // Validate playlistId
    if (!playlistId) {
      throw new Error(
        "Cannot update history. Server cannot access your Playlist ID."
      );
    }

    // Validate data
    if (!data || Object.keys(data).length === 0) {
      throw new Error("No data provided to update the playlist.");
    }

    // Fetch logged-in user
    const loggedInUser = await getLoggedInUser();
    if (!loggedInUser || !loggedInUser._id) {
      throw new Error("You are not authenticated.");
    }

    const userId = loggedInUser._id;

    // Prepare payload
    const payload = {
      dataToUpdate: data,
      userId,
    };

    const url = `${process.env.NEXT_PUBLIC_BASE_URL_PRODUCTION}/api/playlist/local/${playlistId}`;
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update the playlist.");
    }

    revalidateTag?.(`playlist-${playlistId}`);

    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
};
