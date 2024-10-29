import {
  addPlaylist,
  checkPlaylistExist,
  getPlaylistByUserId,
} from "@/queries/playlist";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const searchParams = request.nextUrl.searchParams;
  const limit = parseInt(searchParams.get("limit")) || 5;
  const page = parseInt(searchParams.get("page")) || 1;
  const userId = searchParams.get("userId");

  // sort=createdAt:desc
  const sortParam = searchParams.get("sort");
  const sort = sortParam
    ? { [sortParam.split(":")[0]]: sortParam.split(":")[1] === "desc" ? -1 : 1 }
    : {};

  const filters = {};
  const title = searchParams.get("title");
  // search params
  // user can only search by playlist title
  if (title) {
    filters.title = new RegExp(title, "i");
  }

  // If user is not authenticated, return 401
  if (!userId) {
    return new NextResponse("You are not authenticated.", { status: 401 });
  }

  try {
    // Fetch
    const playlists = await getPlaylistByUserId(
      userId,
      filters,
      limit,
      page,
      sort
    );

    return new NextResponse(JSON.stringify(playlists), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    const { playlistId, userId } = await request.json();

    // Check if user is authenticated
    if (!userId) {
      return new NextResponse("You are not authenticated.", {
        status: 401,
      });
    }

    // Check if playlist already exists for the user
    const playlistAlreadyExist = await checkPlaylistExist(playlistId, userId);
    if (playlistAlreadyExist) {
      return new NextResponse("Playlist already exists.", {
        status: 409,
      });
    }

    // Add the playlist
    await addPlaylist(playlistId, userId);

    return new NextResponse("Playlist added successfully.", {
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(error?.message || "Server Error", {
      status: 500,
    });
  }
};
