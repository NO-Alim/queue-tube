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
  video_completed: {
    type: Array,
  },
  watch_history: {
    type: String, // time 99:99:99
  },
  history_video_id: {
    type: String,
  },
});

// Compound index to enforce unique playlist_id per user
playlistSchema.index({ user: 1, playlist_id: 1 }, { unique: true });

playlistSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    next(new Error("This playlist has already been added by the user."));
  } else {
    next(error);
  }
});

export const Playlist =
  mongoose.models.Playlist || mongoose.model("Playlist", playlistSchema);
