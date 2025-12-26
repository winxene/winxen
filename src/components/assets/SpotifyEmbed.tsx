import { DEFAULT_TRACK_ID } from "@/constants/spotify/defaultTrack";
import { useTheme } from "@/contexts/ThemeProvider";
import { FC, useEffect, useState } from "react";

const SpotifyEmbed: FC = () => {
  const [trackId, setTrackId] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if screen is mobile (< 768px)
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    setIsMobile(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const fetchTopTrack = async () => {
      try {
        const response = await fetch("/api/spotify");

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);

        if (data && data.items && data.items.length > 0) {
          setTrackId(data.items[0].id);
        } else if (data && data.tracks && data.tracks.length > 0) {
          setTrackId(data.tracks[0].id);
        } else {
          setTrackId(DEFAULT_TRACK_ID);
        }
      } catch (error) {
        console.error("Error fetching top track:", error);
        console.log("DEFAULT_TRACK_ID:", DEFAULT_TRACK_ID);
        setTrackId(DEFAULT_TRACK_ID);
      }
    };

    fetchTopTrack();
  }, []);

  const { theme } = useTheme();
  const spotifyTheme = theme === "light" ? "1" : "0";

  return (
    <div className="w-full max-w-md overflow-hidden rounded-xl shadow-lg">
      {trackId && (
        <iframe
          style={{ borderRadius: "12px" }}
          src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=${spotifyTheme}`}
          width="100%"
          height={isMobile ? "80" : "152"}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="Spotify Track Embed"
          className="border-0"
        />
      )}
    </div>
  );
};

export default SpotifyEmbed;
