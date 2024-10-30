import { Playlist } from "@/model/playlilst_model";
import { dbConnect } from "@/service/mongo";

export const addPlaylist = async (playlistId, userId) => {
  console.log(userId);

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
  limit = 5,
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
      Playlist.countDocuments(query),
    ]);

    return { playlists, totalCount };
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
