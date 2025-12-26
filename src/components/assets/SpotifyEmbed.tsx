import { DEFAULT_TRACK_ID } from "@/constants/spotify/defaultTrack";
import { useTheme } from "@/contexts/ThemeProvider";
import { FC, useEffect, useState } from "react";

const SpotifyEmbed: FC = () => {
  const [trackId, setTrackId] = useState("");

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
    <div className="w-full max-w-md xl:max-w-none h-[152px]">
      {trackId && (
        <iframe
          className="rounded-xl w-full transition-all duration-300 border-0"
          src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=${spotifyTheme}`}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="Spotify Track Embed"
        />
      )}
    </div>
  );
};

export default SpotifyEmbed;
