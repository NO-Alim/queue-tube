"use server";

import { getLoggedInUser } from "@/lib/loggedInUser";
import { revalidateTag } from "next/cache";

export const getNotesAction = async (videoId) => {
  try {
    const loggedUser = await getLoggedInUser();

    // Check if user is authenticated
    if (!loggedUser || !loggedUser._id) {
      throw new Error("You are not authenticated.");
    }

    // Validate input
    if (!videoId) {
      throw new Error("Missing required field: videoId.");
    }

    // URL with query parameters
    const params = new URLSearchParams();
    params.append("userId", loggedUser._id);
    params.append("videoId", videoId);

    const url = `${
      process.env.NEXT_PUBLIC_BASE_URL_DEV
    }/api/note?${params.toString()}`;

    //  GET request
    const response = await fetch(url, {
      next: { tags: [`note-${videoId}`] },
    });

    // Handle response
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch notes.");
    }

    // Parse and return the notes data
    const data = await response.json();
    return {
      success: true,
      data, // The notes data from the API
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const addNoteAction = async (formData) => {
  try {
    const loggedUser = await getLoggedInUser();

    if (!loggedUser || !loggedUser._id) {
      throw new Error("You are not authenticated.");
    }

    // Extract fields from formData
    const videoId = formData.get("videoId");
    const text = formData.get("text");
    const timestamp = formData.get("timestamp");

    // Validate input
    if (!videoId || !text || !timestamp) {
      throw new Error(
        `Missing required field(s): ${!videoId ? "videoId " : ""}${
          !text ? "text " : ""
        }${!timestamp ? "timestamp" : ""}`.trim()
      );
    }

    // Construct the API endpoint
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_DEV}/api/note`;

    // Prepare data for the POST request
    const dataToSave = {
      userId: loggedUser._id,
      videoId,
      text,
      timestamp,
    };

    // Make the POST request
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSave),
    });

    // Handle response
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add note.");
    }

    // Parse and return response data
    const data = await response.json();
    revalidateTag(`note-${videoId}`);
    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};
