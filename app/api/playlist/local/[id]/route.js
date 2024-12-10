import {
  deletePlaylist,
  getSinglePlaylist,
  updatePlaylistData,
} from "@/queries/playlist";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { id } = params || {};
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get("userId");
  // If user is not authenticated, return 401
  if (!userId) {
    return new NextResponse("You are not authenticated.", { status: 401 });
  }

  try {
    const playlist = await getSinglePlaylist({ userId, playlistId: id });
    return new NextResponse(JSON.stringify(playlist), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { id } = params || {};
  try {
    const body = await request.json();

    const { dataToUpdate, userId } = body || {};

    if (!userId) {
      return new NextResponse("You are not authenticated.", { status: 401 });
    }

    if (!dataToUpdate) {
      return new NextResponse("No data provided for update.", { status: 400 });
    }

    const result = await updatePlaylistData(id, userId, dataToUpdate);
    return new NextResponse(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  const { id } = params || {};

  try {
    const body = await request.json();
    const { userId } = body || {};

    // Validate user authentication
    if (!userId) {
      return new NextResponse("You are not authenticated.", { status: 401 });
    }

    // Validate playlist ID
    if (!id) {
      return new NextResponse("Playlist ID is required.", { status: 400 });
    }

    // Call a function to delete the playlist (implement this in your backend logic)
    const result = await deletePlaylist(id, userId);

    if (!result) {
      return new NextResponse(
        "Playlist not found or you do not have permission to delete it.",
        { status: 404 }
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "Playlist deleted successfully." }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
};
