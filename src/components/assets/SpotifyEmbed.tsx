import { DEFAULT_TRACK_ID } from "@/constants/spotify/defaultTrack";
import { FC, useEffect, useState } from "react";

const SpotifyEmbed: FC = () => {
  const [trackId, setTrackId] = useState(DEFAULT_TRACK_ID);

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

  return (
    <div>
      <iframe
        className="rounded-xl items-center justify-center"
        src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`}
        width="100%"
        height="152"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify Track Embed"
      />
    </div>
  );
};

export default SpotifyEmbed;
