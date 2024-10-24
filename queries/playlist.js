import { Playlist } from "@/model/playlilst_model";

export const addPlaylist = async (playlistId, userId) => {
  const newPlaylist = {
    user: userId,
    playlist_id: playlistId,
  };

  try {
    const response = await Playlist.create(newPlaylist);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const getPlaylistByUserId = async (userId) => {
  try {
    const playlists = await Playlist.find({ user: userId }).lean();
    return playlists;
  } catch (error) {
    throw new Error(error);
  }
};

export const checkPlaylistExist = async (playlistId, userId) => {
  try {
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
