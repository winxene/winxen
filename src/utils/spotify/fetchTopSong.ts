import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import fetchApi from "../rest/fetch";

const SPOTIFY_BASE_URL = "https://api.spotify.com/v1";

export const fetchTopSong = async (timeRange = "short_term", limit = 1) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    throw new Error(
      "No Spotify access token found. User might not be signed in.",
    );
  }

  try {
    const response = await fetchApi(SPOTIFY_BASE_URL, "me/top/tracks", {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      params: {
        limit: String(limit),
        time_range: timeRange,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching from Spotify API:", error);
    throw new Error(
      `Failed to fetch top tracks: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    );
  }
};
