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
  },
});

// compound index to enforce unique playlist_id per user
playlistSchema.index({ user: 1, playlist_id: 1 }, { unique: true });

export const Playlist =
  mongoose.models.Playlist || mongoose.model("Playlist", playlistSchema);
