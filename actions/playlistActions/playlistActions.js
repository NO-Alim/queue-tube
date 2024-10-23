"use server";

import filterIdFromLink from "@/utils/filterIdFromLink";

export async function getPlaylist(playlistIdOrLink) {
  try {
    const playlistId = filterIdFromLink(playlistIdOrLink);
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
    };

    return playlistDetails;
  } catch (error) {
    throw new Error(error?.message || "Something went wrong.");
  }
}
