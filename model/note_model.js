import mongoose, { Schema } from "mongoose";

const noteSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  video_id: {
    type: String,
    required: true,
  },
  notes: [
    {
      // an _id will be generated automatically, don't need to add externally
      // noteId: {
      //   type: String,
      //   default: () => uuidv4(), // Generate a unique ID for each note
      // },
      text: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Number,
        required: true,
      },
      created_at: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

export const Note = mongoose.models.Note || mongoose.model("Note", noteSchema);
