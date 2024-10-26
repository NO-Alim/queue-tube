import { getPlaylistDetails } from "@/actions/playlistActions/playlistActions";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const { searchParams } = new URL(request.url);
  const playlistIdOrLink = searchParams.get("playlistIdOrLink");

  if (!playlistIdOrLink) {
    return new NextResponse(
      JSON.stringify({ error: "Playlist ID or link is required" }),
      {
        status: 400,
      }
    );
  }

  try {
    const details = await getPlaylistDetails(playlistIdOrLink);
    return new NextResponse(JSON.stringify({ data: details }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};
