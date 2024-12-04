import { Note } from "@/model/note_model";
import { dbConnect } from "@/service/mongo";

export const addNote = async (data) => {
  try {
    await dbConnect();

    const { user, video_id, text, timestamp } = data;

    if (!user || !video_id || !text || timestamp === undefined) {
      throw new Error(
        "Missing required fields: user, video_id, text, or timestamp."
      );
    }

    // Check if a note already exists for the user and video_id
    let noteDocument = await Note.findOne({ user, video_id });

    if (noteDocument) {
      // Add new note to the existing document
      noteDocument.notes.push({ text, timestamp });
    } else {
      // Create a new document if none exists
      noteDocument = new Note({
        user,
        video_id,
        notes: [{ text, timestamp }],
      });
    }

    // Save the document
    await noteDocument.save();
    return { success: true, message: "Note added successfully" };
  } catch (error) {
    throw new Error("Failed to add note: " + error.message);
  }
};

export const getNotes = async (userId, videoId) => {
  try {
    await dbConnect();

    if (!userId || !videoId) {
      throw new Error("Missing required parameters: userId or videoId.");
    }

    // find one
    const noteDocument = await Note.findOne({
      user: userId,
      video_id: videoId,
    });

    if (!noteDocument) {
      return {
        message: "No notes found for the given user and video.",
        notes: [],
      };
    }

    return { notes: noteDocument.notes };
  } catch (error) {
    throw new Error("Failed to retrieve notes: " + error.message);
  }
};

export const updateNote = async (id, userId, noteId, updatedText) => {
  try {
    await dbConnect();

    if (!id || !userId || !noteId || !updatedText) {
      throw new Error(
        "Missing required parameters: id, userId, noteId, or updatedText."
      );
    }

    // find note
    const noteDocument = await Note.findById(id);

    if (!noteDocument) {
      throw new Error("Note document not found.");
    }

    if (noteDocument.user.toString() !== userId) {
      throw new Error(
        "Unauthorized: User does not have permission to update this note."
      );
    }

    // Find the specific note in the notes array by noteId
    const noteToUpdate = noteDocument.notes.find(
      (note) => note.noteId === noteId
    );

    if (!noteToUpdate) {
      throw new Error("Specific note not found in the notes array.");
    }

    // update the text
    noteToUpdate.text = updatedText;

    // and save it
    await noteDocument.save();

    return {
      message: "Note updated successfully.",
      updatedNote: { noteId, text: updatedText },
    };
  } catch (error) {
    throw new Error("Failed to update note: " + error.message);
  }
};

export const deleteNote = async (id, userId, noteId) => {
  try {
    await dbConnect();

    if (!id || !userId || !noteId) {
      throw new Error("Missing required parameters: id, userId, or noteId.");
    }

    const noteDocument = await Note.findById(id);

    if (!noteDocument) {
      throw new Error("Note document not found.");
    }

    // Check if the user is authorized to delete the note
    if (noteDocument.user.toString() !== userId) {
      throw new Error(
        "Unauthorized: User does not have permission to delete this note."
      );
    }

    // Find the index of the specific note in the notes array
    const noteIndex = noteDocument.notes.findIndex(
      (note) => note.noteId === noteId
    );

    if (noteIndex === -1) {
      throw new Error("Specific note not found in the notes array.");
    }

    // Remove the specific note from the notes array
    noteDocument.notes.splice(noteIndex, 1);

    // Save the updated document
    await noteDocument.save();

    return { success: true, message: "Note deleted successfully." };
  } catch (error) {
    throw new Error("Failed to delete note: " + error.message);
  }
};
