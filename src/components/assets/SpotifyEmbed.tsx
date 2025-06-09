import { FC } from "react";

const SpotifyEmbed: FC = () => {
  //add fetch to get number 1 this week played song on spotify

  //will try to split the logic to utils later on
  return (
    <iframe
      className="rounded-xl items-center justify-center"
      src="https://open.spotify.com/embed/track/6wKmxUeMJAoz2GpMrw95z5?utm_source=generator&theme=0"
      width="100%"
      height="152"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>
  );
};

export default SpotifyEmbed;
