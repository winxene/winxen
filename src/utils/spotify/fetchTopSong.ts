import fetchApi from "../rest/fetch";
import { getAccessToken } from "./getAccessToken";

const SPOTIFY_BASE_URL = "https://api.spotify.com/v1";

export const fetchTopSong = async (timeRange = "short_term", limit = 1) => {
  const accessToken = await getAccessToken();

  try {
    const response = await fetchApi(SPOTIFY_BASE_URL, "me/top/tracks", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
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
