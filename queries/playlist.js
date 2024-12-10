import { Playlist } from "@/model/playlilst_model";
import { dbConnect } from "@/service/mongo";

export const addPlaylist = async (playlistId, userId) => {
  const newPlaylist = {
    user: userId,
    playlist_id: playlistId,
  };

  try {
    await dbConnect();
    const response = await Playlist.create(newPlaylist);
    return response;
  } catch (error) {
    throw new Error("Failed to add playlist: " + error.message);
  }
};

export const getPlaylistByUserId = async (
  userId,
  searchParams = {},
  limit = process.env.NEXT_PUBLIC_TOTAL_COUNT,
  page = 1,
  sort = {}
) => {
  try {
    await dbConnect();

    // Set up query
    const query = { user: userId, ...searchParams };

    // Calculate skip
    const skip = (page - 1) * limit;

    // Fetch playlists and total count
    const [playlists, totalCount] = await Promise.all([
      Playlist.find(query).sort(sort).limit(limit).skip(skip).lean(),
      Playlist.countDocuments({ user: userId }),
    ]);

    return { playlists, totalCount };
  } catch (error) {
    throw new Error(error);
  }
};

export const getSinglePlaylist = async ({ userId, playlistId }) => {
  try {
    const query = { user: userId, playlist_id: playlistId };
    const playlist = await Playlist.find(query);
    return playlist;
  } catch (error) {
    throw new Error(error);
  }
};

export const checkPlaylistExist = async (playlistId, userId) => {
  try {
    await dbConnect();
    const response = await Playlist.findOne({
      user: userId,
      playlist_id: playlistId,
    }).lean();

    if (!response) return false;
    return true;
  } catch (error) {
    throw new Error(error);
  }
};

export const updatePlaylistData = async (playlistId, userId, dataToUpdate) => {
  try {
    await dbConnect();
    const playlist = await Playlist.findOne({
      user: userId,
      playlist_id: playlistId,
    });

    if (!playlist) {
      throw new Error("Playlist not found.");
    }

    // Handle video_completed array updates
    if (dataToUpdate.video_completed) {
      playlist.video_completed = Array.from(
        new Set([
          ...(playlist.video_completed || []),
          ...dataToUpdate.video_completed,
        ])
      );
    }

    // Update other fields
    Object.keys(dataToUpdate).forEach((key) => {
      if (key !== "video_completed" && dataToUpdate[key] !== undefined) {
        playlist[key] = dataToUpdate[key];
      }
    });

    await playlist.save();

    return {
      message: "Playlist updated successfully.",
      updatedPlaylist: playlist,
    };
  } catch (error) {
    throw new Error(error.message || "Failed to update the playlist.");
  }
};

export const deletePlaylist = async (playlistId, userId) => {
  try {
    await dbConnect();
    // Check if the playlist exists and belongs to the user
    const playlist = await Playlist.findOne({
      playlist_id: playlistId,
      user: userId,
    });

    if (!playlist) {
      throw new Error(
        "Playlist not found or you do not have permission to delete it."
      );
    }

    await Playlist.deleteOne({ playlist_id: playlistId, user: userId });

    return true;
  } catch (error) {
    throw new Error(error);
  }
};
