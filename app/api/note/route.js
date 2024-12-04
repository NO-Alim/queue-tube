import { addNote, deleteNote, getNotes, updateNote } from "@/queries/note";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    const videoId = searchParams.get("videoId");

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "You are not authenticated" },
        { status: 401 }
      );
    }

    if (!videoId) {
      return NextResponse.json(
        { success: false, message: "Missing video ID" },
        { status: 400 }
      );
    }

    // get notes
    const notes = await getNotes(userId, videoId);

    return NextResponse.json(
      { success: true, notes: notes.notes },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};

export const POST = async (request) => {
  try {
    const { userId, videoId, text, timestamp } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "You are not authenticated" },
        { status: 401 }
      );
    }

    const timestampAsNumber =
      typeof timestamp === "string" ? Number(timestamp) : timestamp;
    if (!videoId || !text || timestampAsNumber === undefined) {
      return NextResponse.json(
        { success: false, message: "Missing required information" },
        { status: 400 }
      );
    }
    if (isNaN(timestampAsNumber)) {
      return NextResponse.json(
        { success: false, message: "Invalid timestamp format" },
        { status: 400 }
      );
    }

    if (typeof text !== "string" || typeof timestampAsNumber !== "number") {
      return NextResponse.json(
        { success: false, message: "Invalid data format" },
        { status: 400 }
      );
    }

    const data = {
      user: userId,
      video_id: videoId,
      text,
      timestamp: timestampAsNumber,
    };

    // add note
    await addNote(data);

    return NextResponse.json(
      {
        success: true,
        message: "Note added successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while adding the note.", // always same message for security purpose
      },
      { status: 500 }
    );
  }
};

export const PATCH = async (request) => {
  try {
    const { id, userId, noteId, updatedText } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "You are not authenticated" },
        { status: 401 }
      );
    }

    if (!id || !noteId || !updatedText) {
      return NextResponse.json(
        { success: false, message: "Missing required information" },
        { status: 400 }
      );
    }

    if (typeof updatedText !== "string") {
      return NextResponse.json(
        { success: false, message: "Invalid data format" },
        { status: 400 }
      );
    }

    // update here
    const result = await updateNote(id, userId, noteId, updatedText);

    return NextResponse.json(
      {
        success: true,
        message: result.message,
        updatedNote: result.updatedNote,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};

export const DELETE = async (request) => {
  try {
    const { id, userId, noteId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "You are not authenticated" },
        { status: 401 }
      );
    }

    if (!id || !noteId) {
      return NextResponse.json(
        { success: false, message: "Missing required information" },
        { status: 400 }
      );
    }

    // delete here
    const result = await deleteNote(id, userId, noteId);

    return NextResponse.json(
      {
        success: true,
        message: result.message,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};
