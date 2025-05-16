"use client";

import { ReactNode, useEffect, useState } from "react";
import PageLayout from "./page-layout";

type ReadmeCardProps = {
  children: ReactNode;
};

const ReadmeCard = ({ children }: ReadmeCardProps) => {
  return (
    <div className="flex flex-col min-w-full mx-0 md:mx-24 2xl:mx-96 border border-suggestion rounded p-5">
      <p className="text-subtitle text-xs md:text-sm py-4">README.md</p>
      {children}
    </div>
  );
};

const SpotifyEmbed = () => {
  //add loading mechanism later on
  return (
    <iframe
      className="rounded-xl"
      src="https://open.spotify.com/embed/track/6wKmxUeMJAoz2GpMrw95z5?utm_source=generator&theme=0"
      width="40%"
      height="152"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>
  );
};

const AsciiArt = ({ src }: { src: string }) => {
  const [asciiArt, setAsciiArt] = useState("");

  const fetchAsciiArt = async (textSrc: String) => {
    const response = await fetch(textSrc.toString());
    if (!response.ok) {
      throw new Error("Failed to fetch ASCII art");
    }
    const data = await response.text();
    return data;
  };

  useEffect(() => {
    fetchAsciiArt(src)
      .then((data) => setAsciiArt(data))
      .catch((error) => console.error(error));
  }, [src]);

  return (
    <pre className="text-[8px] text-center md:text-xs whitespace-pre-wrap">
      {asciiArt}
    </pre>
  );
};

const Home = () => {
  return (
    <PageLayout
      title="Winxen's Portfolio Terminal"
      contentDescription="Winxen personal website. Contains projects and information about me."
    >
      <ReadmeCard>
        <div className="flex flex-col-reverse md:flex-row space-y-4 justify-center">
          <div className="flex flex-col space-y-4 items-stretch">
            <p>
              A passionate <span className="text-link">computer engineer </span>
              driven by tech innovation. Loves{" "}
              <span className="text-title">
                JRPG games, Computers, Mobile Apps, and IoT
              </span>
              . Currently learning mandarin and aiming to pass HSK 4.
            </p>
            <p> My This Week's top jams:</p>
            <SpotifyEmbed />
          </div>
          <AsciiArt src="/ascii/nemu-miyao.txt" />
        </div>
        <p className="mt-20 mb-4">
          This whole website is based on my terminal look which you can access
          from my dotfiles. You can use the “interactive” terminal to navigate.
          Type help to see accepted commands.
        </p>
      </ReadmeCard>
    </PageLayout>
  );
};

export default Home;
