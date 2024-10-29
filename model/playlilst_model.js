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
