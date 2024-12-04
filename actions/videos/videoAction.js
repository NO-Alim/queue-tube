"use server";

const { getLoggedInUser } = require("@/lib/loggedInUser");

export const getVideos = async ({ playlistId = "", pageToken = "" }) => {
  try {
    const loggedInUser = await getLoggedInUser();
    if (!loggedInUser._id) {
      throw new Error("You are not authenticated.");
    }
    const response = await fetch(
      `${process.env.YOUTUBE_API}/playlistItems?key=${process.env.YOUTUBE_API_KEY}&part=id,snippet,contentDetails&playlistId=${playlistId}&maxResults=50&pageToken=${pageToken}`,
      {
        next: { revalidate: 86400 },
      }
    );
    const resObj = await response.json();
    // Check if the items array is empty
    if (!resObj.items || resObj.items.length === 0) {
      throw new Error("Playlist ID or URL isn't valid.");
    }
    return resObj;
  } catch (error) {
    return {
      error: error?.message || "Something went wrong.",
    };
  }
};
