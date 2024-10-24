import mongoose, { Schema } from "mongoose";

const playlistSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  playlist_id: {
    type: String,
    required: true,
    unique: true,
  },
});

export const Playlist =
  mongoose.models.Playlist || mongoose.model("Playlist", playlistSchema);
